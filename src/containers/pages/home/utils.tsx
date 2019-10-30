import React from 'react'

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.?%&=]*)?/
export const getChildrenToRender = (item: any, i: number) => {
	const tag = item.name.indexOf('title') === 0 ? 'h2' : 'div'
	let children =
		typeof item.children === 'string' && item.children.match(isImg)
			? React.createElement('img', { src: item.children, alt: 'img' })
			: item.children
	if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
		children = React.createElement('button', {
			...item.children
		})
	}

	return React.createElement(tag, { key: i.toString(), ...item }, children)
}
