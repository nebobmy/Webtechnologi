import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserTable() {
    const [users, setUsers] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [filterConfig, setFilterConfig] = useState({ key: '', value: '' });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const sortedUsers = React.useMemo(() => {
        let sortableUsers = [...users];
        if (sortConfig.key) {
            sortableUsers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableUsers;
    }, [users, sortConfig]);

    const filteredUsers = React.useMemo(() => {
        if (!filterConfig.key || !filterConfig.value) {
            return sortedUsers;
        }
        return sortedUsers.filter(user =>
            user[filterConfig.key].toString().toLowerCase().includes(filterConfig.value.toLowerCase())
        );
    }, [sortedUsers, filterConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const requestFilter = (key, value) => {
        setFilterConfig({ key, value });
    };

    return (
        <div>
            <h2>User Table</h2>
            <table>
                <thead>
                <tr>
                    <th>
                        <button type="button" onClick={() => requestSort('fullName')}>
                            Full Name
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('fullName', e.target.value)}
                        />
                    </th>
                    <th>
                        <button type="button" onClick={() => requestSort('gender')}>
                            Gender
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('gender', e.target.value)}
                        />
                    </th>
                    <th>
                        <button type="button" onClick={() => requestSort('age')}>
                            Age
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('age', e.target.value)}
                        />
                    </th>
                    <th>
                        <button type="button" onClick={() => requestSort('phoneNumber')}>
                            Phone Number
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('phoneNumber', e.target.value)}
                        />
                    </th>
                    <th>
                        <button type="button" onClick={() => requestSort('email')}>
                            Email
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('email', e.target.value)}
                        />
                    </th>
                    <th>
                        <button type="button" onClick={() => requestSort('country')}>
                            Country
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('country', e.target.value)}
                        />
                    </th>
                    <th>
                        <button type="button" onClick={() => requestSort('uniqueField')}>
                            Unique Field
                        </button>
                        <input
                            type="text"
                            placeholder="Filter"
                            onChange={e => requestFilter('uniqueField', e.target.value)}
                        />
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map(user => (
                    <tr key={user._id}>
                        <td>{user.fullName}</td>
                        <td>{user.gender}</td>
                        <td>{user.age}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.email}</td>
                        <td>{user.country}</td>
                        <td>{user.uniqueField}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;
