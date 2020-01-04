import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Row } from 'antd';

const IconActiveStyle = css`
	transform: translateX(10px);
	opacity: 1;
`;

export const EditIconWrapper = styled.div<{ isActive: boolean }>`
	position: absolute;
	display: inline-block;
	font-size: 1rem;
	opacity: 0;
	cursor: pointer;
	transform: translateX(0);
	${({ isActive }) => isActive && IconActiveStyle}
	transition: all 0.5s;
`;

export const H1 = styled.h1`
	display: inline-block;
	position: relative;
	&:hover {
		${EditIconWrapper} {
			${IconActiveStyle}
		}
	}
`;

export const ButtonRow = styled(Row)`
	margin-top: 10px;
	button {
		width: 100%;
	}
`;
