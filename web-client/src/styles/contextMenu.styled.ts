import styled from 'styled-components'

export const Wrapper = styled.div<{ x: string, y: string }>`
    position: absolute;
    left: ${props => props.x}px;
    top: ${props => props.y}px;
    z-index: 9999;

    width: 200px;
    background-color: #2b2b2b;
    border-radius: 6px;
    padding: 4px 0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
`

export const Menu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

export const Item = styled.li`
    padding: 8px 16px;
    font-size: 14px;
    color: #e5e5e5;
    cursor: pointer;
    user-select: none;

    display: flex;
    align-items: center;

    &:hover {
        background-color: #3a3a3a;
    }

    &:active {
        background-color: #444;
    }
`

export const Span = styled.span`
    margin-left: 4px;
`
