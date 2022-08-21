import React from 'react';
import 'react-dropzone-component/styles/filepicker.css';
import 'dropzone/dist/min/dropzone.min.css';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { IconButton } from '@chakra-ui/react';
import { AttachmentIcon, DeleteIcon } from '@chakra-ui/icons';

export default function FilePreview({ fileList, onDelete }) {
    return (
        <>
            <Text color="gray.400">{`${fileList.length} archivos cargados`}</Text>

            {fileList.map((file, idx) => (
                <Flex
                    key={idx}
                    bgColor="white"
                    p={2}
                    px={4}
                    my={1.5}
                    shadow="sm"
                    borderRadius="md"
                    borderWidth={1}
                    color="gray.600"
                    alignItems="center"
                    justifyContent="space-between"
                    transition="all 0.1s linear"
                    _hover={{ backgroundColor: 'gray.50' }}
                    flexWrap="wrap"
                >
                    <Stack
                        flexWrap="wrap"
                        direction="row"
                        alignItems="center"
                        spacing={3}
                    >
                        <AttachmentIcon />
                        <Text color="black" width="xs">
                            {file.name}
                        </Text>
                        <Text color="gray.500">
                            {(file.size / 1000).toFixed(2)} KB
                        </Text>
                    </Stack>
                    <IconButton
                        onClick={() => {
                            onDelete(file);
                        }}
                        variant="ghost"
                        aria-label="Eliminar"
                        size="lg"
                        borderRadius="full"
                        icon={<DeleteIcon color="red.500" />}
                    />
                </Flex>
            ))}
        </>
    );
}