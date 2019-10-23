import React from 'react'
import ResponsiveContext from 'containers/context/responsive'
import Menu from 'antd/lib/menu'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Layout from 'antd/lib/layout'

class AppHeader extends React.Component<{}, {}> {
	static contextType = ResponsiveContext

	state = {
		menuVisible: false,
		menuMode: 'horizontal'
	}

	componentDidMount = () => {
		const { isMobile } = this.context
		if (isMobile) {
			this.setState({ menuMode: 'inline' })
		} else {
			this.setState({ menuMode: 'horizontal' })
		}
	}

	render = () => {
		const { menuMode } = this.state

		const menu = (
			<Menu mode={'horizontal'} id="nav" key="nav">
				<Menu.Item key="home">
					<a href="/dododuck">About</a>
				</Menu.Item>
				<Menu.Item key="docs">
					<a href="/dododuck">
						<span>Team</span>
					</a>
				</Menu.Item>
				<Menu.Item key="projects">
					<a href="/dododuck">Projects</a>
				</Menu.Item>
				<Menu.Item key="blog">
					<a href="/dododuck">Blog</a>
				</Menu.Item>
				{menuMode === 'inline' && (
					<Menu.Item key="preview">
						<a target="_blank" href="http://preview.pro.ant.design/" rel="noopener noreferrer">
							预览
						</a>
					</Menu.Item>
				)}
			</Menu>
		)

		return (
			<Layout.Header id="header" className="header">
				<Row>
					<Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
						<div id="logo">
							<span>AdsFlight</span>
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
