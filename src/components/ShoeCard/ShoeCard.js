import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const VARIANTS = {
    'new-release': {
        label: 'Just Released!',
        color: COLORS.secondary,
    },
    'on-sale': {
        label: 'Sale',
        color: COLORS.primary,
    },
};

const ShoeCard = ({ slug, name, imageSrc, price, salePrice, releaseDate, numOfColors }) => {
    // There are 3 variants possible, based on the props:
    //   - new-release
    //   - on-sale
    //   - default
    //
    // Any shoe released in the last month will be considered
    // `new-release`. Any shoe with a `salePrice` will be
    // on-sale. In theory, it is possible for a shoe to be
    // both on-sale and new-release, but in this case, `on-sale`
    // will triumph and be the variant used.
    // prettier-ignore
    const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc} />
                    {variant !== 'default' && (
                        <Label style={{ '--bg': VARIANTS[variant].color }}>{VARIANTS[variant].label}</Label>
                    )}
                </ImageWrapper>
                <Spacer size={12} />
                <Row>
                    <Name>{name}</Name>
                    <Price
                        style={{
                            '--line': variant === 'on-sale' ? 'line-through' : 'none',
                            '--color': variant === 'on-sale' ? COLORS.gray['700'] : COLORS.gray['900'],
                        }}
                    >
                        {formatPrice(price)}
                    </Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
                    {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
    text-decoration: none;
    color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
    position: relative;
`;

const Label = styled.span`
    position: absolute;
    top: 12px;
    right: -4px;
    display: block;
    padding: 8px 8px 8px 12px;
    font-size: 0.875rem;
    background-color: var(--bg);
    color: ${COLORS.white};
    font-weight: ${WEIGHTS.bold};
    border-radius: 2px;
`;
const Image = styled.img`
    width: 100%;
    border-radius: 16px 16px 8px 8px;
`;

const Row = styled.div`
    font-size: 1rem;
    display: flex;
    justify-content: space-between;
`;

const Name = styled.h3`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    text-decoration: var(--line);
    color: var(--color);
`;

const ColorInfo = styled.p`
    color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.primary};
`;

export default ShoeCard;
