import React from 'react';
import { Icon } from 'antd';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
	margin: 35px 0;
	opacity: 0.4;
	font-size: 11px;
	text-align: center;
	a {
		color: black;
	}
`;

export const Footer: React.FC = () => (
	<FooterWrapper>
		Made with ❤️ by rostaklein |{' '}
		<a href="https://github.com/rostaklein/plyn-kalkulacka">
			<Icon type="github" /> github repo
		</a>{' '}
	</FooterWrapper>
);
