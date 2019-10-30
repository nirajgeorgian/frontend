import React from 'react'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import Button from 'antd/lib/button'

import genderEquality from 'containers/pages/home/assests/GenderEquality.png'
import education from 'containers/pages/home/assests/Education.png'
import healthyAging from 'containers/pages/home/assests/HealthyAgeing.png'
import mentalHealth from 'containers/pages/home/assests/MentalHealth.png'
import climateChange from 'containers/pages/home/assests/ClimateChange.png'
import areaOfImpact from 'containers/pages/home/assests/AreaOfImpact.png'

const { TweenOneGroup } = TweenOne

const featuresCN = [
	{
		title: 'Gender Equality',
		content: 'contribute',
		src: genderEquality,
		color: '#13C2C2',
		shadowColor: 'rgba(19,194,194,.12)'
	},
	{
		title: 'Education',
		content: 'contribute',
		src: education,
		color: '#2F54EB',
		shadowColor: 'rgba(47,84,235,.12)'
	},
	{
		title: 'Healthy Aging',
		content: 'contribute',
		src: healthyAging,
		color: '#F5222D',
		shadowColor: 'rgba(245,34,45,.12)'
	},
	{
		title: 'Mental Health',
		content: 'contribute',
		src: mentalHealth,
		color: '#1AC44D',
		shadowColor: 'rgba(26,196,77,.12)'
	},
	{
		title: 'Climate Change',
		content: 'contribute',
		src: climateChange,
		color: '#FAAD14',
		shadowColor: 'rgba(250,173,20,.12)'
	},
	{
		title: 'Your Area Of Impact',
		content: 'contribute',
		src: areaOfImpact,
		color: '#722ED1',
		shadowColor: 'rgba(114,46,209,.12)'
	}
]

const pointPos = [
	{ x: -30, y: -10 },
	{ x: 20, y: -20 },
	{ x: -65, y: 15 },
	{ x: -45, y: 80 },
	{ x: 35, y: 5 },
	{ x: 50, y: 50, opacity: 0.2 }
]

interface IAreasOfImpactProps {
	isMobile: boolean
}
interface IAreasOfImpactState {
	hoverNum: number | null
}

class AreasOfImpact extends React.PureComponent<IAreasOfImpactProps, IAreasOfImpactState> {
	state = {
		hoverNum: null
	}

	getEnter = (e: any) => {
		const i = e.index
		const r = Math.random() * 2 - 1
		const y = Math.random() * 10 + 5
		const delay = Math.round(Math.random() * (i * 50))

		return [
			{
				delay,
				opacity: 0.4,
				...pointPos[e.index],
				ease: 'easeOutBack',
				duration: 300
			},
			{
				y: r > 0 ? `+=${y}` : `-=${y}`,
				duration: Math.random() * 1000 + 2000,
				yoyo: true,
				repeat: -1
			}
		]
	}

	onMouseOver = (i: number) => {
		this.setState({
			hoverNum: i
		})
	}

	onMouseOut = () => {
		this.setState({
			hoverNum: null
		})
	}

	render = () => {
		const { isMobile } = this.props
		const { hoverNum } = this.state
		let children: any = [[], [], []]
		featuresCN.forEach((item, i) => {
			const isHover = hoverNum === i
			const pointChild = ['point-0 left', 'point-0 right', 'point-ring', 'point-1', 'point-2', 'point-3'].map(
				(className) => (
					<TweenOne
						component="i"
						className={className}
						key={className}
						style={{
							background: item.color,
							borderColor: item.color
						}}
					/>
				)
			)
			const child = (
				<li key={i.toString()}>
					<h2>{item.title}</h2>
					<div className="page1-box">
						<TweenOneGroup
							className="page1-point-wrapper"
							enter={this.getEnter}
							leave={{
								x: 0,
								y: 30,
								opacity: 0,
								duration: 300,
								ease: 'easeInBack'
							}}>
							{(isMobile || isHover) && pointChild}
						</TweenOneGroup>

						<div className="page1-image">
							<img src={item.src} alt="img" style={{ borderRadius: '50%' }} />
						</div>
						<Button size="small" type="primary" block>
							Contribute
						</Button>
					</div>
				</li>
			)
			children[Math.floor(i / 3)].push(child)
		})

		children = children.filter((x: Array<string>) => x.length > 0)
		children = children.map((item: JSX.Element, i: number) => (
			<QueueAnim className="page1-box-wrapper" key={i.toString()} type="top" component="ul">
				{item}
			</QueueAnim>
		))

		return (
			<div className="home-page page1">
				<div className="home-page-wrapper" id="page1-wrapper">
					<h2>
						Areas Of <span>Impact</span>
					</h2>
					<div className="title-line-wrapper page1-line">
						<div className="title-line" />
					</div>
					<OverPack>{children}</OverPack>
				</div>
			</div>
		)
	}
}

export default AreasOfImpact
