import * as S from '@/styles/contextMenu.styled'

interface Props {
    x: number
    y: number
}


export const ContextMenu = ({x, y}: Props) => {
    return (
        <S.Wrapper
            onClick={(e) => e.stopPropagation()}
            x={`${x}`}
            y={`${y}`}
        >
            <S.Menu>
                <S.Item>
                    <S.Span>reply</S.Span>
                </S.Item>
                <S.Item>
                    <S.Span>share</S.Span>
                </S.Item>
                <S.Item>
                    <S.Span>delete</S.Span>
                </S.Item>
            </S.Menu>
        </S.Wrapper>
    )
}