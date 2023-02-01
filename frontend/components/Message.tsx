import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  StackDivider,
  Box,
  Text,
} from "@chakra-ui/react";
import { formatEthAddress } from "helpers/general";

function Message({ sender, message }: { sender: string; message: string }) {
  const formatedAddress = formatEthAddress(sender as string);
  return (
    <div className="message">
      <Card>
        <CardHeader>
          <Heading size="md">User: {formatedAddress}</Heading>
        </CardHeader>

        <CardBody mt={-4}>
          <Stack divider={<StackDivider />} spacing="1">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Message
              </Heading>
              <Text pt="2" fontSize="sm">
                {message}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default Message;
