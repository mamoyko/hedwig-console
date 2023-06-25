import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box
} from "@chakra-ui/react";
import moment from "moment";
import { isEmpty } from "../../../../../utils/helpers";
import { getBlastActivityList } from "../../../../../slices/blast/blastActions";
import { blastState } from "../../../../../slices/blast/blastSlice";
import Table from "../../../../common/Table";
import Paginator from "../../../../common/Paginator";
import ActivityDetails from "../ActivityDetails";

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

const ActivityList = () => {
  const dispatch = useDispatch();
  const { activityList } = useSelector(blastState);

  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const TOTAL_COUNT = !isEmpty(activityList) ? activityList.total_count : 0;
  const LIST = !isEmpty(activityList) ? activityList.list.map((data) => {
    const formattedDate = moment(data["createdAt"]).format("YYYY-MM-DD HH:mm:ss");

    return {
      date: formattedDate,
      name: data["blast_name"],
      id: data["blast_id"],
      senderMask: data["sender_mask_name"],
      status: transformStatus(data["status"])
    };
  }) : [];

  const headers = [
    { key: "date", displayText: "Date" },
    { key: "name", displayText: "Name" },
    { key: "id", displayText: "ID" },
    { key: "senderMask", displayText: "Sender Mask" },
    { key: "status", displayText: "Status" }
  ];

  const handleItemClick = (values) => {
    setSelectedItem(values);
    setActivityDetailsOpen(!activityDetailsOpen);
  };

  useEffect(() => {
    dispatch(getBlastActivityList({ page: currentPage, limit: pageLimit }));
  }, [pageLimit, currentPage]);

  return (
    <Box>
      <Table
        headers={headers}
        data={LIST}
        itemClickAction={handleItemClick}
      />

      <Paginator
        totalCount={TOTAL_COUNT}
        limit={pageLimit}
        setLimit={setPageLimit}
        page={currentPage}
        setPage={setCurrentPage}
      />

      <ActivityDetails
        details={selectedItem}
        isOpen={activityDetailsOpen}
        onClose={handleItemClick}
      />
    </Box>
  );
};

export default ActivityList;