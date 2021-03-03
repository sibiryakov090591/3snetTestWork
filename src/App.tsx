import React, {useEffect} from 'react';
import './App.css';
import {DataGrid} from '@material-ui/data-grid';
import {useDispatch, useSelector} from "react-redux";
import {initializeAPI} from './store/reducer/Reducer';
import {GlobalStateType} from "./store/store";
import Pagination from '@material-ui/lab/Pagination';

function App() {

    //============================================================//
    // This app create by Material ui with cool filter functional //
    //============================================================//


    // Hooks
    const tableData = useSelector((state: GlobalStateType) => state.reducer)
    const dispatch = useDispatch()


    // First initialize
    useEffect(() => {
        dispatch(initializeAPI())
    }, [dispatch])


    // Map columns for table
    const columns = Object.keys(tableData.data[0]).map(i => {
        return {
            field: i,
            headerName: i,
            width: 200
        }
    })


    // How many pages to paginator be?
    const pagesCount = Math.ceil(tableData.count / tableData.limit);


    // Paginator handler
    const changePageHandler = (event: object, page: number) => {
        dispatch(initializeAPI(page))
    }


    // Render
    return (
        <div style={{height: "100vh", width: '100%'}}>
            <DataGrid className={"table"}
                      rows={tableData.data}
                      columns={columns}
                      pageSize={tableData.limit}
                      checkboxSelection
                      hideFooterPagination={true}
            />

            <Pagination className={"paginator"}
                        color={"primary"}
                        count={pagesCount}
                        onChange={changePageHandler}
            />
        </div>
    );
}

export default App;

