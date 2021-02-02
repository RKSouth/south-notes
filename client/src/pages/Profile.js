import React, { useContext, useState, useRef } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from "@apollo/react-hooks"

import { Card, Form, Grid, Button, Image, Label, Icon } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton.js';