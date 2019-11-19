import React, { useState, useContext } from 'react'
import Menu, { MenuMode } from 'antd/lib/menu'
import { AppConsumer } from 'containers/context/app'
import Button from 'antd/lib/button'
import { Auth } from 'aws-amplify'
import Col from 'antd/lib/col'
import Popover from 'antd/lib/popover'
import Layout from 'antd/lib/layout'
import Icon from 'antd/lib/icon'
import Row from 'antd/lib/row'
import ResponsiveContext from 'containers/context/responsive'
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'

const AppHeader = (props: RouteComponentProps) => {
	const [menuVisible, setMenuVisible] = useState(false)
	const { isMobile } = useContext(ResponsiveContext)

	const navOptions = {
		menuMode: 'horizontal' as MenuMode
	}
	if (isMobile) {
		navOptions.menuMode = 'inline' as MenuMode
	} else {
		navOptions.menuMode = 'horizontal' as MenuMode
	}

	const menu: JSX.Element = (
		<Menu mode={navOptions.menuMode} id="nav" key="nav">
			<Menu.Item key="home">
				<a href="/dodo">About</a>
			</Menu.Item>
			<Menu.Item key="docs">
				<a href="/dodo">
					<span>Team</span>
				</a>
			</Menu.Item>
			<Menu.Item key="projects">
				<a href="/dodo">Projects</a>
			</Menu.Item>
			<Menu.Item key="blog">
				<a href="/dodo">Blog</a>
			</Menu.Item>
			{navOptions.menuMode === 'inline' && (
				<Menu.Item key="preview">
					<AppConsumer>
						{({ isAuthenticated, setAuthenticated }) =>
							isAuthenticated ? (
								<Link
									to="#"
									onClick={async () => {
										await Auth.signOut()
										setAuthenticated && setAuthenticated(false)
										props.history.push('/signin')
									}}>
									signout
								</Link>
							) : (
								<Link to="/signin">Account</Link>
							)
						}
					</AppConsumer>
				</Menu.Item>
			)}
		</Menu>
	)

	const { menuMode } = navOptions

	return (
		<Layout.Header id="header" className="header">
			{menuMode === 'inline' ? (
				<Popover
					overlayClassName="popover-menu"
					placement="bottomRight"
					content={menu}
					trigger="click"
					visible={menuVisible}
					arrowPointAtCenter>
					<Icon className="nav-phone-icon" type="menu" onClick={() => setMenuVisible(!menuVisible)} />
				</Popover>
			) : null}
			<Row>
				<Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
					<div id="logo">
						<span>Circles</span>
					</div>
				</Col>
				<Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
					<div className="header-meta">
						<div id="preview">
							<AppConsumer>
								{({ isAuthenticated, setAuthenticated }) =>
									isAuthenticated ? (
										<Link to="#">
											<Button
												onClick={async () => {
													await Auth.signOut()
													setAuthenticated && setAuthenticated(false)
													props.history.push('/signin')
												}}
												icon="eye-o">
												signout
											</Button>
										</Link>
									) : (
										<Link id="preview-button" to="/signin">
											<Button icon="eye-o">account</Button>
										</Link>
									)
								}
							</AppConsumer>
						</div>
						{menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
					</div>
				</Col>
			</Row>
		</Layout.Header>
	)
}

export default withRouter(AppHeader)
