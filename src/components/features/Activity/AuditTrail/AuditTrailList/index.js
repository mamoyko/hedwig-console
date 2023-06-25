import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box
} from "@chakra-ui/react";
import moment from "moment";
import { isEmpty } from "../../../../../utils/helpers";
import { getAuditTrailList } from "../../../../../slices/auditTrail/auditTrailActions";
import { auditTrailState } from "../../../../../slices/auditTrail/auditTrailSlice";
import Table from "../../../../common/Table";
import Paginator from "../../../../common/Paginator";
import ActivityDetails from "../../MyActivities/ActivityDetails";

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

const AuditTrailList = () => {
  const dispatch = useDispatch();
  const { auditTrailList } = useSelector(auditTrailState);

  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const TOTAL_COUNT = !isEmpty(auditTrailList) ? auditTrailList.total_count : 0;
  const LIST = !isEmpty(auditTrailList) ? auditTrailList.list.map((data) => {
    const formattedDate = moment(data["createdAt"]).format("YYYY-MM-DD HH:mm:ss");

    return {
      id: data["blast_id"],
      date: formattedDate,
      name: data["blast_name"],
      user: `${data["firstname"]} ${data["lastname"]}`,
      activityType: "SMS Blast",
      status: transformStatus(data["status"])
    };
  }) : [];

  const headers = [
    { key: "date", displayText: "Date" },
    { key: "name", displayText: "Name" },
    { key: "user", displayText: "User" },
    { key: "activityType", displayText: "Activity Type" },
    { key: "status", displayText: "Status" }
  ];

  const handleItemClick = (values) => {
    setSelectedItem(values);
    setActivityDetailsOpen(!activityDetailsOpen);
  };

  useEffect(() => {
    dispatch(getAuditTrailList({ page: currentPage, limit: pageLimit }));
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

export default AuditTrailList;