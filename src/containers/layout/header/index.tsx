import React from 'react'
import ResponsiveContext from 'containers/context/responsive'
import Menu, { MenuMode, MenuProps } from 'antd/lib/menu'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Layout from 'antd/lib/layout'
import Popover from 'antd/lib/popover'
import Icon from 'antd/lib/icon'

interface _IAppHeaderState extends MenuProps {
	menuVisible: boolean
	menuMode: MenuMode
}

class AppHeader extends React.Component<{}, _IAppHeaderState> {
	static contextType = ResponsiveContext

	readonly state = {
		menuVisible: false,
		menuMode: 'horizontal' as MenuMode
	}

	componentDidMount = () => {
		const { isMobile } = this.context
		if (isMobile) {
			this.setState({ menuMode: 'inline' as MenuMode })
		} else {
			this.setState({ menuMode: 'horizontal' as MenuMode })
		}
	}

	handleShowMenu = () => {
		this.setState((prevState) => ({
			menuVisible: !prevState.menuVisible
		}))
	}

	render = () => {
		const { menuMode, menuVisible } = this.state

		const menu: JSX.Element = (
			<Menu mode={menuMode} id="nav" key="nav">
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
				{menuMode === 'inline' && (
					<Menu.Item key="preview">
						<a target="_blank" href="http://preview.pro.ant.design/" rel="noopener noreferrer">
							Circles
						</a>
					</Menu.Item>
				)}
			</Menu>
		)

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
						<Icon className="nav-phone-icon" type="menu" onClick={this.handleShowMenu} />
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
								<a id="preview-button" target="_blank" href="http://preview.pro.ant.design" rel="noopener noreferrer">
									<Button icon="eye-o">Account</Button>
								</a>
							</div>
							{menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
						</div>
					</Col>
				</Row>
			</Layout.Header>
		)
	}
}

export default AppHeader
