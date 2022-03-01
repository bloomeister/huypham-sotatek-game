import React from "react";

type Props = React.BaseHTMLAttributes<HTMLDivElement>;

export default function GameViewPort({ children }: Props): React.ReactElement {
    return <div className="relative bg-red-200 w-full lg:w-[900px] h-[200px] sm:h-[300px] lg:h-[400px] shrink">{children}</div>;
}
