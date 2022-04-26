import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage, sendTextQuery, sendEventQuery } from './store/actions';
import DishCard from './DishCard';
import OrderList from './OrderList';

const useStyles = makeStyles(theme => ({
	cardContent: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
	},
	messageRow: {
		'&.contact': {
			'& .bubble': {
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.getContrastText(theme.palette.background.paper),
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 20,
				borderBottomRightRadius: 20,
				'& .time': {
					marginLeft: 12
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopLeftRadius: 20
				}
			},
			'&.last-of-group': {
				'& .bubble': {
					borderBottomLeftRadius: 20
				}
			}
		},
		'&.me': {
			paddingLeft: 40,

			'& .avatar': {
				order: 2,
				margin: '0 0 0 16px',
				top: -5,
			},
			'& .bubble': {
				marginLeft: 'auto',
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
				borderTopLeftRadius: 20,
				borderBottomLeftRadius: 20,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				marginRight: 32,
				'& .time': {
					justifyContent: 'flex-end',
					right: 0,
					marginRight: 12
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopRightRadius: 20
				}
			},

			'&.last-of-group': {
				'& .bubble': {
					borderBottomRightRadius: 20
				}
			}
		},
		'&.contact + .me, &.me + .contact': {
			paddingTop: 20,
			marginTop: 20
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 20,
				paddingTop: 13
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomLeftRadius: 20,
				paddingBottom: 13,
				'& .time': {
					display: 'flex'
				}
			}
		}
	}
}));

function Chat(props) {
	const dispatch = useDispatch();
	const messages = useSelector(({ chatApp }) => chatApp.chats.messages);
	const items = useSelector(({ chatApp }) => chatApp.chats.items);
	const user = useSelector(({user}) => user.auth.user);

	const classes = useStyles(props);
	const chatRef = useRef(null);
	const [messageText, setMessageText] = useState('');

	useEffect(() => {
		if (messages) {
			scrollToBottom();
		}
	}, [messages]);

	useEffect(() => {
		dispatch(sendEventQuery("Welcome", user.id));
	}, [dispatch]);

	function scrollToBottom() {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}

	function onInputChange(ev) {
		setMessageText(ev.target.value);
	}

	function onMessageSubmit(ev) {
		ev.preventDefault();
		if (messageText === '') {
			return;
		}

		dispatch(
			setMessage({
				content: messageText,
				sender: 'man',
			})
		);
		dispatch(sendTextQuery(messageText, user.id));
		setMessageText('');
	}

	return (
		<div className={clsx('flex flex-col relative', props.className)}>
			<FuseScrollbars ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
				{messages && messages.length > 0 ? (
					<div className="flex flex-col pt-16 px-16 ltr:pl-56 rtl:pr-56 pb-40">
						{messages.map((message, i) => {
							return (
								<div
									key={i}
									className={clsx(
										classes.messageRow,
										'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-16 pb-4 last-of-group',
										{ me: message.sender === 'man' },
										{ contact: message.sender === 'bot' },
										i + 1 === messages.length && 'pb-32'
									)}
								>
									{ message.sender !== 'man' ? 
										<Avatar
											className="avatar absolute ltr:left-0 rtl:right-0 m-0 -mx-32"
											src="/img/bot.png"
										/> :
										<Avatar
											className="avatar absolute ltr:right-0 rtl:right-0 m-0 -mx-32"
											src={user.avatar}
										/>
									}
									<div className="bubble flex relative items-center justify-center p-12 max-w-full shadow">
										<div className="leading-tight whitespace-pre-wrap">{message.content}</div>
										<Typography
											className="time absolute hidden w-full text-11 mt-8 -mb-24 ltr:left-0 rtl:right-0 bottom-0 whitespace-nowrap"
											color="textSecondary"
										>
											{message.time}
										</Typography>
									</div>
								</div>
							);
						})}
						<div className={classes.cardContent}>
							{
								items.map(ele => {
									return (
										<DishCard key={ele._id} data={ele} />
									)
								})
							}
						</div>
						<OrderList />
					</div>
				) : (
					<div className="flex flex-col flex-1">
						<div className="flex flex-col flex-1 items-center justify-center">
							<Icon className="text-128" color="disabled">
								chat
							</Icon>
						</div>
						<Typography className="px-16 pb-24 text-center" color="textSecondary">
							Start a conversation by typing your message below.
						</Typography>
					</div>
				)}
			</FuseScrollbars>
			<form onSubmit={onMessageSubmit} className="bottom-0 right-0 left-0 py-16 px-8">
				<Paper className="flex items-center relative rounded-24 shadow">
					<TextField
						autoFocus={false}
						id="message-input"
						className="flex-1"
						InputProps={{
							disableUnderline: true,
							classes: {
								root: 'flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8',
								input: ''
							},
							placeholder: 'Type your message'
						}}
						InputLabelProps={{
							shrink: false,
							className: classes.bootstrapFormLabel
						}}
						onChange={onInputChange}
						value={messageText}
					/>
					<IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit">
						<Icon className="text-24" color="action">
							send
						</Icon>
					</IconButton>
				</Paper>
			</form>
		</div>
	);
}

export default Chat;
