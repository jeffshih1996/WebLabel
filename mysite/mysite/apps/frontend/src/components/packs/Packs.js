import React, { Component, forwardRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import axios from 'axios';
import MaterialTable from 'material-table';

import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import 'font-awesome/css/font-awesome.min.css';


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
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

// import { deletePack, renamePack } from '../../actions/packs';

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
    OpenInNewIcon: forwardRef((props, ref) => <OpenInNewIcon {...props} ref={ref} />),
};

export class Packs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users_show: false,
            pack: { id: null, name: null },
            d_selected: [],
            pack_users: { in: [], all: [] },
        };
    }

    componentDidMount() {
        // this.props.getPacks();
        console.log('dsa');
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log('nextProps.current_project.id', nextProps);
    // }

    onChange = (d_selected) => {
        this.setState({ d_selected });
    };


    onSave = async () => {
        const { d_selected, pack } = this.state;
        const res = await axios.post(`/api/v1/packs/${pack.id}/users/`, { selected: d_selected });
        console.log('onSave');
    };


    onReset = () => {
        const { pack_users } = this.state;
        this.setState({ d_selected: pack_users.in });
        console.log('onReset');
    };

    onClose = () => {
        // const { project_users } = this.state;
        // this.setState({ selected: project_users.in });
        console.log('onClose');

        this.setState({
            users_show: false,
            pack: { id: null, name: null },
            d_selected: [],
            pack_users: { in: [], all: [] },
        });
    };

    onShowMember = (id, name) => {
        // get d_selected:  from server
        this.get_member(id, name);
    }

    async get_member(id, name) {
        // await deletePack(id);

        const res = await axios.get(`/api/v1/packs/${id}/users/`);
        console.log('res.data', res.data);

        this.setState({
            users_show: true,
            pack: { id, name },
            d_selected: res.data.in,
            pack_users: res.data,
        });
    }

    async delete_pack(id) {
        const { onDeletePack } = this.props;
        // await deletePack(id);

        const res = await axios.delete(`/api/v1/packs/${id}/`);
        console.log('res.data', res.data);
        onDeletePack(id);
    }

    async edit_pack(id, pack) {
        // await deletePack(id);
        const { onRenamePack } = this.props;
        const res = await axios.patch(`/api/v1/packs/${id}/`, pack);
        console.log('res.data', res.data);
        onRenamePack(id, res.data);
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
            },
        ];

        // selection: true,  can disable then onClick: (evt, data) => data is obj not array
        const m_options = {
            filtering: true,
            // selection: true,
            pageSizeOptions: [10, 20],
            pageSize: 10,
        };
        const { projectPacks } = this.props;

        // const d_options = [{ value: 'AAA', label: 'AAA' }, { value: 'BBB', label: 'BBB' }];
        const {
            users_show,
            d_selected,
            pack_users,
            pack,
        } = this.state;

        const d_options = pack_users.all.map((item) => ({ value: item, label: item }));
        console.log('render', d_options, d_selected);

        let member_content = '';
        if (users_show) {
            member_content = (
                <div className="col-4 p-0">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {`Pack: ${pack.name}`}
                            </div>
                        </div>
                        <div className="row">
                            <div className="ml-3 mr-auto">Available</div>
                            <div className="ml-4 mr-auto">Chosen</div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <DualListBox
                                    canFilter
                                    options={d_options}
                                    selected={d_selected}
                                    onChange={this.onChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col">
                                <button onClick={this.onSave} className="btn btn-block btn-secondary">
                                    Save
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={this.onReset} className="btn btn-block btn-secondary">
                                    Reset
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={this.onClose} className="btn btn-block btn-secondary">
                                    Close
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            );
        }
        return (
            <>
                <div className="col-6 p-0">
                    <MaterialTable
                        icons={tableIcons}
                        title="Basic Filtering Preview"
                        columns={m_columns}
                        data={projectPacks}
                        options={m_options}
                        editable={{
                            onRowUpdate: (newData, oldData) => new Promise((resolve) => {
                                setTimeout(() => {
                                    this.edit_pack(oldData.id, newData);
                                    resolve();
                                }, 100);
                            }),
                            onRowDelete: (oldData) => new Promise((resolve) => {
                                setTimeout(() => {
                                    this.delete_pack(oldData.id);
                                    resolve();
                                }, 100);
                            }),
                        }}
                        actions={[
                            {
                                // TOTO:  hahaha
                                tooltip: 'show selected batch der tasks',
                                icon: OpenInNewIcon,
                                onClick: (evt, data) => {
                                    console.log('show user');
                                    this.onShowMember(data.id, data.name);
                                },
                            },
                        ]}
                    />
                </div>
                {member_content}
            </>
        );
    }
}

Packs.propTypes = {
    projectPacks: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRenamePack: PropTypes.func.isRequired,
    onDeletePack: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//     // packs: state.packs.packs,
//     project_packs: state.projects.project_packs,
// });

export default connect(null, {})(Packs);
// export default connect(mapStateToProps, { renamePack, deletePack })(Packs);
