import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    styled,
    Avatar
} from '@mui/material';
import { Message } from '../features/ChatSlice';
import useMessages from '../hooks/useMessages';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    '&.right': {
        margin: '10px 0 10px auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        borderRadius: '16px',
        maxWidth: '80%'
    },
    '&.left': {
        margin: '10px auto 10px 0',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '16px',
        maxWidth: '80%'
    }
}));

const Chat: React.FC = () => {
    const {
        handleSendMessage,
        error,
        messageInputRef,
        messages,
        lastMessageRef,
        currentUser
    } = useMessages();

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    alignItems: 'center',
                    marginBottom: 2,
                    marginTop: 2,
                    display: 'flex',
                    gap: 1
                }}>
                <Avatar
                    src={
                        'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                    }
                    alt={currentUser}
                />
                <Typography variant='h6'>{currentUser}</Typography>
            </Box>
            <List
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    padding: 2
                }}>
                {messages.map((message: Message, index: number) => (
                    <StyledListItem
                        className={
                            message.sender === 'AI Assistant' ? 'left' : 'right'
                        }
                        key={index}>
                        <div
                            ref={
                                index === messages.length - 1
                                    ? lastMessageRef
                                    : null
                            }>
                            <ListItemText
                                primary={message.text}
                                secondary={`Sent at: ${new Date(
                                    message.timestamp
                                ).toLocaleTimeString()}`}
                            />
                        </div>
                    </StyledListItem>
                ))}
            </List>
            <Divider />
            <Box
                sx={{
                    padding: 2,
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center'
                }}>
                <TextField
                    fullWidth
                    inputRef={messageInputRef}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder='Type your message...'
                />
                <Button
                    onClick={handleSendMessage}
                    variant='contained'
                    color='primary'
                    sx={{ padding: 2, paddingLeft: 4, paddingRight: 4 }}>
                    Send
                </Button>
            </Box>
            {error && (
                <Typography color='error' textAlign={'center'}>
                    {error}
                </Typography>
            )}
        </Box>
    );
};

export default Chat;
