import * as React from 'react';

import { Table, Column, Cell } from  '@blueprintjs/table';

import { IGroup } from './data/grouper';

const HackCell = Cell as any;
const HackTable = Table as any;
const HackColumn = Column as any;

export interface IListogramTableProps {
    columns: string[],
    selected: {[index: string]: any},
    listogramData: {[index: string]: any}[],
    grouped: IGroup,
}

export function ListogramTable({
    columns,
    listogramData,
    selected,
    grouped,
}: IListogramTableProps): JSX.Element | null {
    if (listogramData.length === 0) {
        return null;
    }

    function getSelectedRows(): Set<number> {
        const selectedRows = new Set<number>();
        Object.keys(selected).map(key => {
            const value = selected[key];
            grouped[key][value].forEach(idx => selectedRows.add(idx));
        });

        return selectedRows;
    }

    const indices = getSelectedRows();

    const hasSelection = Object.keys(selected).length > 0;
    const filteredData =  hasSelection ? listogramData.filter((datum, i) => {
        return indices.has(i);
    }) : listogramData;

    function cellRenderer(row: number, property: string): JSX.Element {
        let cellValue = filteredData[row][property]
        if (cellValue === undefined) {
            cellValue = "";
        }
        return <HackCell>{cellValue}</HackCell>;
    }

    const renderColumns = columns.filter(column => {
        if (!hasSelection) {
            return true;
        } else {
            return true;
        }
    }).map((column, i) =>
        <HackColumn name={column} key={i} cellRenderer={(row: number) => cellRenderer(row, column)} />
    );

    function handleSelection(region: any) {
        console.log(region);
    }
    return (<HackTable onSelection={handleSelection} selectionModes="full-columns" numRows={filteredData.length}>{renderColumns}</HackTable>);
}
