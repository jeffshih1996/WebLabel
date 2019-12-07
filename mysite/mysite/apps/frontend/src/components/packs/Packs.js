import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { deletePack, renamePack } from '../../actions/packs';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

export class Packs extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        // this.props.getPacks();
        console.log('dsa');
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('nextProps.current_project.id', nextProps);
    // }

    async delete_pack(id) {
        const { deletePack } = this.props;
        await deletePack(id);
    }

    async edit_pack(id, data) {
        const { renamePack } = this.props;
        await renamePack(id, data);
    }

    render() {
        const m_columns = [
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'OFFICE_Priority', field: 'officepriority', type: 'numeric' },
            { title: 'SOHO_Priority', field: 'sohopriority', type: 'numeric' },
            {
                title: 'Project',
                field: 'project_name',
                // lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ];

        const m_options = {
            filtering: true,
            pageSizeOptions: [10, 20],
            pageSize: 10,
        };
        const { project_packs } = this.props;

        return (
            <>
                <MaterialTable
                    icons={tableIcons}
                    title="Basic Filtering Preview"
                    columns={m_columns}
                    data={project_packs}
                    options={m_options}
                    editable={{
                        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                            setTimeout(() => {
                                this.edit_pack(oldData.id, newData);
                                resolve();
                                resolve();
                            }, 100);
                        }),
                        onRowDelete: (oldData) => new Promise((resolve) => {
                            setTimeout(() => {
                                this.delete_pack(oldData.id);
                                resolve();
                                resolve();
                            }, 100);
                        }),
                    }}
                />
            </>
        );
    }
}

Packs.propTypes = {
    // packs: PropTypes.array.isRequired,
    project_packs: PropTypes.arrayOf(PropTypes.any).isRequired,
    renamePack: PropTypes.func.isRequired,
    deletePack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    // packs: state.packs.packs,
    project_packs: state.projects.project_packs,

});

export default connect(mapStateToProps, { renamePack, deletePack })(Packs);
