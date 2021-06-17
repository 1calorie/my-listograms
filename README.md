### Demo flow #1

Feature Requirements

  - Visual

    - histogram of grouped data

  - Interaction

    - select all rows matching a value

Assumptions

  - genericish input

  - lots of data


What got done

- List

- Listogram

- Selection and filtering

- Multiselect with bug


-----------------


### Demo flow #2

Scale
(1.5m rows, 125 unq col vals)

- Listogram

  - interaction
  - visual

- Selection

- List

------------------------------------------------

### Code

https://github.com/1calorie/my-listograms

Design

  - Grouper
    ```
    {
       [key]: {
         [value]: Set<RowIndex>
       }
    }
    ```
    https://github.com/1calorie/my-listograms/blob/master/src/data/grouper.tsx

  - App State

      - data
        ```
         interface IListogramData {
           columns: string[]
           grouped: IGroup;
           list: any[];
         }
         ```
         https://github.com/1calorie/my-listograms/blob/master/src/index.tsx#L17

      - selection
         ```
         {[index: string]: string}
         ```

         https://github.com/1calorie/my-listograms/blob/master/src/index.tsx#L36

  - Components

     Table, List, Card
  - Favorite spots in the code
     - click listener

        https://github.com/1calorie/my-listograms/blob/master/src/listogramCard.tsx#L42
     - safe values

       https://github.com/1calorie/my-listograms/blob/master/src/data/grouper.tsx#L5

-----------------------

Improvements

