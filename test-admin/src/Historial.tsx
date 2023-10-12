
import { useNotify, useRecordContext} from "react-admin";
import { Card, CardContent } from '@mui/material';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import {
    List,
    Datagrid,
    TextField,
    // ReferenceField,
    EditButton,
    // Edit,
    Create,
    SimpleForm,
    ReferenceInput,
    TextInput,
    useRefresh,
    useRedirect,
    Edit,
    FilterList,
    FilterListItem,
    FilterLiveSearch,
    // Button,
    // useCreate,
    SelectInput,
    SearchInput,
    NumberInput,
} from "react-admin";
import React, { useState, ChangeEvent } from 'react';
import { ChoiceOption, clasificacionChoices, prioridadChoices, tipoChoicesMapping, estatusChoices } from './choices';
import { getUserId,getUserRol } from "./authState";
import { ShowButton } from 'react-admin';

const CommentShowButton = () => <ShowButton label="Show comment" />;


export const HistorialList = () => (
    <List > 
        <Datagrid>
             <TextField source="id" />
             <TextField source="updatedBy" />
            <EditButton />
        </Datagrid>
        </List>
    );
