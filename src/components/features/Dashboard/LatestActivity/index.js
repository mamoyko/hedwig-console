import React, { useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Text as Title,
  Box as Header,
  Box,
  Flex,
  Center,
} from "@chakra-ui/react";
import { blastState } from "../../../../slices/blast/blastSlice";
import { getBlastActivityList } from "../../../../slices/blast/blastActions";
import { isEmpty } from "../../../../utils/helpers";
import Table from "../../../common/Table";
import Button from "../../../common/Button";
import { ActivitiesIcon } from "../../../../assets/images/icons";

const transformStatus = (status) => {
  const colors = {
    "completed": "#71C422",
    "failed": "#F04747",
    "in-progress": "#158DD6"
  };

  return (
    <Box color={colors[status]} fontWeight={500} textTransform="capitalize">
      <Box h="10px" w="10px" bg={colors[status]} borderRadius="50%" display="inline-block" mr="8px"></Box>
      {status}
    </Box>
  );
};

const LatestActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activityList } = useSelector(blastState);

  const currentDate = moment().format("lll");

  const LIST = !isEmpty(activityList) ? activityList.list.map((data) => {
    const formattedDate = moment(data["createdAt"]).format("YYYY-MM-DD HH:mm:ss");

    return {
      date: formattedDate,
      name: data["blast_name"],
      type: "SMS Blast",
      status: transformStatus(data["status"])
    };
  }) : [];

  const headers = [
    { key: "date", displayText: "Date" },
    { key: "name", displayText: "Name" },
    { key: "type", displayText: "Type" },
    { key: "status", displayText: "Status" }
  ];

  const handleNavigateToActivities = () => {
    navigate("/activity/my-activities");
  };

  useEffect(() => {
    dispatch(getBlastActivityList({ page: 1, limit: 5 }));
  }, []);

  return (
    <Box mt="24px">
      <Box bg="white" w="full" borderRadius="xl" borderWidth="1px" borderColor="#E0E4E6">
        <Header p="24px 28px 0 28px">
          <Flex h="50px" alignItems="center">
            <Box borderRadius="md" mr={4}>
              <img src={ActivitiesIcon} alt="blaster-icon" width={40} height={40} />
            </Box>
            <Title fontSize="24px" fontWeight={500}>Latest Activity</Title>
          </Flex>
        </Header>

        <Box ml="24px" my="16px">
          {`Latest Activities as of ${currentDate}`}
        </Box>

        <Table
          headers={headers}
          data={LIST}
        />

        <Center>
          <Button alignSelf="center" width="240px" mt="16px" mb="24px" data-testid="view-all-activities-btn" onClick={handleNavigateToActivities}>
            View All Activities
          </Button>
        </Center>
      </Box>
    </Box>
  );
};

export default LatestActivity;