// export const Wrapper = styled.div<{ x: string, y: string }>`
//     width: 80px;
//     background-color: rgb(58, 58, 58);
//     border-radius: 10px;
//     box-shadow: 0 12px 35px rgba(0, 189, 25, 0.2);
//     position: absolute;
//     left: ${props => props.x}px;
//     top: ${props => props.y}px;
//     z-index: 999;
// `
//
// export const Menu = styled.ul`
//     padding: 1px 2px;
//     margin: 0;
// `
//
// export const Item = styled.li`
//     list-style: none;
//     font-size: 22px;
//     height: 35px;
//     width: 100%;
//     display: flex;
//     cursor: pointer;
//     align-items: center;
//     margin-bottom: 2px;
//     border-bottom: solid;
//     border-radius: 5px;
//     border-width: 1px;
//     border-color: rgba(255, 255, 255, 0.5);
//
//     &:hover {
//         background-color: rgb(58, 58, 58);
//     }
// `
//
// export const Span = styled.span`
//     font-size: medium;
//     margin-left: 8px;
//     color: #e2e2e2;
// `
// ContextMenu.styles.ts

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
