import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AGENT_USER_INFO, CUSTOMER_USER_INFO } from '../../../utility/constants';
import { setCurrentUser } from '../../../redux/actions/current_user';
import { setRecipientInfo } from '../../../redux/actions/chat';

function ConfigurationBar() {
    const [user, setUser] = useState('agent');
    const dispatch = useDispatch();

    const handleUserChange = (e) => {
        const selectedUser = e.target.value;
        setUser(selectedUser);
        if (selectedUser === 'customer') {
            dispatch(setCurrentUser(CUSTOMER_USER_INFO));
            dispatch(setRecipientInfo(AGENT_USER_INFO));
        } else {
            dispatch(setCurrentUser(AGENT_USER_INFO));
            dispatch(setRecipientInfo(CUSTOMER_USER_INFO));
        }
    };

    return (
        <Box sx={{ p: 1, backgroundColor: 'action.hover' }}>
            <Box sx={{ with: 1 }}>
                <ToggleButtonGroup
                    value={user}
                    color="primary"
                    exclusive
                    onChange={handleUserChange}
                    aria-label="change user"
                    size="small"
                >
                    <ToggleButton value="agent" aria-label="Agent">
                        Agent
                    </ToggleButton>
                    <ToggleButton value="customer" aria-label="Customer">
                        Customer
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
}

export default ConfigurationBar;