import * as React from 'react';

export interface ICellProps {
  value: 'x' | 'o' | null;
  onClick: any;
}

export function Cell (props: ICellProps) {
  return (
    <div className="Cell" onClick={props.onClick}>
      <span>{props.value && (props.value as string).toUpperCase()}</span>
    </div>
  );
}
