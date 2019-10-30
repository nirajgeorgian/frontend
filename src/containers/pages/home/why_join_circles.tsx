import React, { PureComponent } from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Row, Col } from 'antd'
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack'
import { getChildrenToRender } from './utils'

import meaningfulWork from 'containers/pages/home/assests/MeaningfulWork.png'
import selfDevelopment from 'containers/pages/home/assests/SelfDevelopment.png'
import trustAndASense from 'containers/pages/home/assests/Trust&ASenseOfBelonging.png'
import noHierarchies from 'containers/pages/home/assests/NoHierarchies.png'

const DataSource = {
	wrapper: { className: 'home-page-wrapper content3-wrapper' },
	page: { className: 'home-page content3' },
	OverPack: { playScale: 0.3 },
	titleWrapper: {
		className: 'title-wrapper',
		children: [
			{
				name: 'title',
				children: (
					<React.Fragment>
						Why Join <span>Circles</span>
					</React.Fragment>
				),
				className: 'title-h1'
			},
			{
				name: 'content',
				className: 'title-content',
				children: ''
			}
		]
	},
	block: {
		className: 'content3-block-wrapper',
		children: [
			{
				name: 'block0',
				className: 'content3-block',
				md: 12,
				xs: 24,
				children: {
					icon: {
						className: 'content3-icon',
						children: meaningfulWork
					},
					textWrapper: { className: 'content3-text' },
					title: { className: 'content3-title', children: 'Meaningful Work' },
					content: {
						className: 'content3-content',
						children:
							'We create the conditions for Circles to come together and support each other to do meaningful work. People who are part of Circles are more resilient to the changing economical landscape, more confident and more able to think and act strategically.'
					}
				}
			},
			{
				name: 'block1',
				className: 'content3-block',
				md: 12,
				xs: 24,
				children: {
					icon: {
						className: 'content3-icon',
						children: selfDevelopment
					},
					textWrapper: { className: 'content3-text' },
					title: { className: 'content3-title', children: 'Self Development' },
					content: {
						className: 'content3-content',
						children:
							'Circles is a place where you can have multiple partnerships simultaneously, and that’s a rich source of knowledge, belonging, recognition, and accountability. Working on high impact projects with a pool of diverse, elite talents pushes you to become a better version of yourself.'
					}
				}
			},
			{
				name: 'block2',
				className: 'content3-block',
				md: 12,
				xs: 24,
				children: {
					icon: {
						className: 'content3-icon',
						children: trustAndASense
					},
					textWrapper: { className: 'content3-text' },
					title: { className: 'content3-title', children: 'Trust & a sense of belonging' },
					content: {
						className: 'content3-content',
						children:
							'We aim on creating a community with people that can contribute to the psychological safety of each other, people with high emotional intelligence and good boundaries. Because we’re going into experimental territory, our members need to be tolerant, open to different ways of knowing, being and doing.'
					}
				}
			},
			{
				name: 'block3',
				className: 'content3-block',
				md: 12,
				xs: 24,
				children: {
					icon: {
						className: 'content3-icon',
						children: noHierarchies
					},
					textWrapper: { className: 'content3-text' },
					title: { className: 'content3-title', children: 'No Hierarchies' },
					content: {
						className: 'content3-content',
						children:
							'Circles are networks of autonomous and inter-dependent groups, where no one is in charge but everyone can take on acts of leadership in different areas. We want to create a space where there are no privileges and no special access to information, where information is shared widely and transparently so teams and individuals can make faster, more informed decisions.'
					}
				}
			}
		]
	}
}

interface IAreasOfImpactProps {
	isMobile: boolean
}

class WhyJoinCircles extends PureComponent<IAreasOfImpactProps, {}> {
	getDelay = (e: number, b: number) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100

	render = () => {
		const { isMobile, ...props } = this.props
		const dataSource = DataSource
		let clearFloatNum = 0
		const children = dataSource.block.children.map((item: any, i: number) => {
			const childObj = item.children
			const delay = isMobile ? i * 50 : this.getDelay(i, 24 / item.md)
			const liAnim = {
				opacity: 0,
				type: 'from',
				ease: 'easeOutQuad',
				delay
			}
			const childrenAnim = { ...liAnim, x: '+=10', delay: delay + 100 }
			clearFloatNum += item.md
			clearFloatNum = clearFloatNum > 24 ? 0 : clearFloatNum

			return (
				<TweenOne
					component={Col}
					animation={liAnim}
					key={item.name}
					{...item}
					componentProps={{ md: item.md, xs: item.xs }}
					className={!clearFloatNum ? `${item.className || ''} clear-both`.trim() : item.className}>
					<TweenOne
						animation={{
							x: '-=10',
							opacity: 0,
							type: 'from',
							ease: 'easeOutQuad'
						}}
						key="img"
						{...childObj.icon}>
						<img src={childObj.icon.children} width="100%" alt="img" />
					</TweenOne>
					<div {...childObj.textWrapper}>
						<TweenOne key="h2" animation={childrenAnim} component="h2" {...childObj.title}>
							{childObj.title.children}
						</TweenOne>
						<TweenOne key="p" animation={{ ...childrenAnim, delay: delay + 200 }} component="div" {...childObj.content}>
							{childObj.content.children}
						</TweenOne>
					</div>
				</TweenOne>
			)
		})

		return (
			<div {...props} {...dataSource.wrapper}>
				<div {...dataSource.page}>
					<div {...dataSource.titleWrapper}>
						<div {...dataSource.titleWrapper}>{dataSource.titleWrapper.children.map(getChildrenToRender)}</div>
					</div>
					<OverPack {...dataSource.OverPack}>
						<QueueAnim key="u" type="bottom">
							<Row key="row" {...dataSource.block}>
								{children}
							</Row>
						</QueueAnim>
					</OverPack>
				</div>
			</div>
		)
	}
}

export default WhyJoinCircles
