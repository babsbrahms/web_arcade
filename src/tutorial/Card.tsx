import React from 'react'

export const Card: React.FC<{ children?: JSX.Element | null }> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    )
}

