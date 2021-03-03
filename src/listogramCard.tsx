import * as React from 'react';

import { IGroup, IGrouping, normalizeValue } from './data/grouper';

interface IListogramCardProps {
    name: string;
    grouping: IGrouping;
    width: number;
    selected: {[index: string]: any};
}

const CHAR_SIZE = 6;

export function ListogramCard({
    name,
    grouping,
    width,
    selected,
}: IListogramCardProps): JSX.Element {
    const groupedKeys = Object.keys(grouping);
    let maxSize = 1;
    let maxKeyLen = 0;

    const keysAndSizes = [];
    for (let i = 0 ; i < groupedKeys.length; i ++) {
        const key = groupedKeys[i];
        const value  = grouping[key];
        maxSize = Math.max(maxSize, value.size);
        maxKeyLen = Math.max(maxKeyLen,  ("" + key).length);
        keysAndSizes.push([key, value.size])
    }

    function buildListogram(index: number, key: string, value: string, size: number) {
        const ratio = size / maxSize;
        let isSelected = false;
        if (selected.hasOwnProperty(key)) {
            isSelected = selected[key] === value;
        }
        return (
            <li
                data-key={key}
                data-value={value}
                className={'list-container ' + (isSelected ? 'selected' : '')}
                key={index}
            >
                <div className='inner-list-container'>
                    <span style={{width: (maxKeyLen * CHAR_SIZE) }} className='list-name'>
                        {normalizeValue(value)}
                    </span>
                    <div className='list-bar' style={{ width: ratio * width }} />
                </div>
            </li>
        );
    }

    return (
        <div className='listogram-card'>
            <h3>{name}</h3>
            {
                keysAndSizes.map(([value, size], index) => buildListogram(index, name, "" + value, +size))
            }
        </div>
    );
}

interface IListogramListProps {
    selected: {[index: string]: string};
    group: IGroup;
    onSelect: (key: string, value: string) => void;
}

export function ListogramList({ selected, group, onSelect }: IListogramListProps): JSX.Element {
    function handleSelection(element: any) {
        const key = element.target.dataset["key"];
        const value = element.target.dataset["value"];
        if (key == null || value == null) {
            return;
        }

        onSelect(key, value);
    }

    const list = Object.keys(group).map((key, i) => {
        return <ListogramCard
            selected={selected}
            key={i}
            name={key}
            grouping={group[key]}
            width={200}
        />;
    });

    return <div onClick={handleSelection} className='listograms'>{list}</div>
}
