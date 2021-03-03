import * as React from 'react';

import { useState, useEffect } from 'react';
import { render } from 'react-dom';

import { ListogramTable } from './listogramTable';
import { ListogramList } from './listogramCard'
import { getJson } from './api';
import { IGroup, grouper } from './data/grouper';

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/table/lib/css/table.css";

import "./style.scss";

interface IListogramData {
    columns: string[]
    grouped: IGroup;
    list: any[];
}

async function getListogramData(): Promise<IListogramData> {
    const results = await getJson('/listograms');
    const list = await results.json();
    const grouped = grouper(list);
    return { grouped, list, columns: Object.keys(grouped) };
}

const App = () => {
    const [
        listogramData,
        setListogramData,
    ] = useState<IListogramData>({ grouped: {}, list: [], columns: [] });

    const [selectedValues, setSelectedValues] = useState<{[index: string]: string}>({});

    useEffect(() => {
        getListogramData().then(d => setListogramData(d));
    }, []);

    const { list, grouped, columns } = listogramData;

    function handleListogramSelection(key: string, value: string) {
        if (selectedValues.hasOwnProperty(key)) {
            const existingValue = selectedValues[key];
            if (existingValue === value) {
                delete selectedValues[key];
            } else {
                selectedValues[key] = value;
            }
        } else {
            selectedValues[key] = value;
        }

        setSelectedValues({ ...selectedValues });
    }

    return (
        <div className='table-and-list'>
            <ListogramTable
                selected={selectedValues}
                grouped={grouped}
                columns={columns}
                listogramData={list}
            />
            <ListogramList
                selected={selectedValues}
                onSelect={handleListogramSelection}
                group={grouped}
            />
        </div>
    );
};

render(<App />, document.getElementById("root"));
