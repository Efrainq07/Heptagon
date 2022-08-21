import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Grid } from '@material-ui/core';
import { Button } from '@chakra-ui/button';
import { Center, Flex, Text } from '@chakra-ui/layout';
import { useToken, chakra } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import FilePreview from './FilePreview.react';

export default function Uploader({ id }) {
    const [show, setShow] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [progress, setProgress] = useState(0);

    const processFiles = (acceptedFiles) => {
        const formData = new FormData();

        for (const i in acceptedFiles) {
            formData.append(`files[${i}]`, acceptedFiles[i]);
        }

        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
            setProgress(parseInt((event.loaded / event.total) * 100));
            if (parseInt((event.loaded / event.total) * 100) == 100) {
                setShow(false);
            }
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.error(xhr.statusText);
            }
        };

        xhr.open('POST', `/uploader/${id}`, true);

        xhr.send(formData);
    };

    const onDrop = useCallback(
        (acceptedFiles) => {
            console.log(fileList, acceptedFiles);
            setFileList([...fileList, ...acceptedFiles]);
        },
        [fileList]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    const [dzOutline] = useToken('colors', ['gray.400']);

    return (
        <>
            {show ? (
                <>
                    <Center
                        id="dz"
                        cursor="pointer"
                        {...getRootProps()}
                        transition={'all 0.2s ease-in-out'}
                        py={16}
                        px={2}
                        textAlign="center"
                        borderRadius="lg"
                        outline="none"
                        color="gray.600"
                        border={`2px dashed ${dzOutline}`}
                        backgroundColor="gray.100"
                        _hover={{
                            backgroundColor: 'gray.200',
                        }}
                    >
                        <input {...getInputProps()} />
                        <Text>
                            Arrastre sus facturas o de click para seleccionarlas
                            en el explorador.
                        </Text>
                    </Center>
                    <Flex
                        my="5"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        sx={{ '& > button': { my: 1 } }}
                    >
                        <Button
                            colorScheme="blue"
                            disabled={fileList.length == 0}
                            onClick={() => {
                                processFiles(fileList);
                            }}
                        >
                            Procesar
                        </Button>
                        <Button
                            leftIcon={<SettingsIcon />}
                            variant="ghost"
                            colorScheme="blue"
                            onClick={() => {}}
                        >
                            Opciones Avanzadas
                        </Button>
                    </Flex>
                    <FilePreview
                        fileList={fileList}
                        onDelete={(file) => {
                            const fileList_ = [...fileList];

                            fileList_.splice(fileList_.indexOf(file), 1);

                            setFileList(fileList_);
                        }}
                    />
                </>
            ) : (
                <Grid container justify="center">
                    <Button
                        as={chakra.a}
                        variant="ghost"
                        color="primary"
                        href={`/download/${id}`}
                        align="center"
                    >
                        Descargar
                    </Button>
                </Grid>
            )}
        </>
    );
}