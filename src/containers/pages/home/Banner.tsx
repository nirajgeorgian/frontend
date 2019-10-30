import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Button } from 'antd'
import homepageBanner from 'containers/pages/home/assests/homepage_banner.png'

export interface IBanner {
	isMobile: boolean
}
const Banner = (props: IBanner): React.FunctionComponentElement<IBanner> => {
	return (
		<div className="banner-wrapper">
			{props.isMobile && (
				<TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
					<div className="home-banner-image">
						<img src={homepageBanner} alt="banner" width="100%" />
					</div>
				</TweenOne>
			)}
			<QueueAnim className="banner-title-wrapper" type={props.isMobile ? 'bottom' : 'right'}>
				<div key="line" className="title-line-wrapper">
					<div className="title-line" style={{ transform: 'translateX(-64px)', color: '#ED4853' }} />
				</div>
				<h1 key="h1">We Are Circles</h1>
				<p key="content">
					We gather the most talented individuals to solve the world&apos;s most challenging societal problems.
				</p>
				<div key="button" className="button-wrapper">
					<a href="http://preview.pro.ant.design" target="_blank" rel="noopener noreferrer">
						<Button type="primary">Join The Community</Button>
					</a>
				</div>
			</QueueAnim>
			{!props.isMobile && (
				<TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
					<img src={homepageBanner} alt="circle banner" />
				</TweenOne>
			)}
		</div>
	)
}

export default Banner
