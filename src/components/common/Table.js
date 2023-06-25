import React from "react";
import {
  TableContainer,
  Table as ChakraTable,
  Center,
  Thead,
  Tbody,
  Tr,
  Td,
  Th
} from "@chakra-ui/react";

const Table = ({
  headers,
  data,
  itemClickAction = () => null
}) => {
  return (
    <TableContainer>
      <ChakraTable variant='simple'>
        <Thead>
          <Tr>
            {
              headers.map(({ key, displayText }) => (
                <Th key={key} textTransform="capitalize" borderColor="#E0E4E6" py="15px">{displayText}</Th>
              ))
            }
          </Tr>
        </Thead>
        <Tbody bg="#F7F7F7" fontSize="14px" fontWeight={400}>
          {
            data.map((row, index) => (
              <Tr key={`table-row-${index}`} _hover={{ bg: "white" }} cursor="pointer" transition="0.5s ease" onClick={() => itemClickAction(row)}>
                {
                  headers.map(({ key }) => (
                    <Td key={`table-data-${index}-${key}`} borderColor="#E0E4E6">
                      {row[key]}
                    </Td>
                  ))
                }
              </Tr>
            ))
          }
        </Tbody>
      </ChakraTable>
      {
        data.length === 0 &&
        <Center p="20px" fontWeight={500}>
          No Records Found
        </Center>
      }
    </TableContainer>
  );
};

export default Table;