import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Layout from 'antd/lib/layout'

const AppFooter: React.FC = () => {
	return (
		<Layout.Footer id="footer" className="dark">
			<div className="footer-wrap">
				<Row>
					<Col lg={6} sm={24} xs={24}>
						<div className="footer-center">
							<h2>Ads Flight</h2>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design-pro">
									Airport & Travelers
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://ant.design">
									Advertisement Sign Up
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://mobile.ant.design">
									FAQ
								</a>
							</div>
						</div>
					</Col>
					<Col lg={6} sm={24} xs={24}>
						<div className="footer-center">
							<h2>Company</h2>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://scaffold.ant.design">
									Blog
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://motion.ant.design">
									Team
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://library.ant.design/">
									Support
								</a>
							</div>
						</div>
					</Col>
					<Col lg={6} sm={24} xs={24}>
						<div className="footer-center">
							<h2>Contact Us</h2>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="/demo">
									airport@ads-flight.com
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="/dododuck">
									Mauritius
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design-pro">
									FAQ
								</a>
							</div>
						</div>
					</Col>
					<Col lg={6} sm={24} xs={24}>
						<div className="footer-center">
							<h2>Learn More</h2>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="http://ant.design/">
									Privacy Policy
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="https://antv.alipay.com/">
									Terms & Conditions
								</a>
							</div>
							<div>
								<a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">
									Cookie Policy
								</a>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		</Layout.Footer>
	)
}

export default AppFooter
