import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import LoadingButton from '@mui/lab/LoadingButton';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';

import { users } from '../../../../../src/_mock/user';

import Iconify from '../../../../components/Admin/iconify';
import Scrollbar from '../../../../components/Admin/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [titleEditModal, setTitleEditModal] = useState("");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenEditModal = (title) => {
    setOpenEditModal(true);
    setTitleEditModal(title);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      {/* DELETE MODAL */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm delete product"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color='inherit'>Cancel</Button>
          <LoadingButton
            size="large"
            variant="contained"
            color="error"
            onClick={handleCloseDeleteModal} 
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
      {/* EDIT, CREATE MODAL */}
      <Dialog
        sx={{
          p: 5,
          width: 1,
        }}
        open={openEditModal}
        onClose={handleCloseEditModal}
        PaperProps={{
          component: 'form',
          // onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          //   event.preventDefault();
          //   const formData = new FormData(event.currentTarget);
          //   const formJson = Object.fromEntries((formData as any).entries());
          //   const email = formJson.email;
          //   console.log(email);
          //   handleClose();
          // },
        }}
      >
        <DialogTitle><Typography variant="h4">{titleEditModal}</Typography></DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
          <div>
            <FormControl sx={{ mt: 1.5 }}>
              <InputLabel required htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
            <TextField
              sx={{ mt: 1.5, ml: 1.5 }}
              required
              id="outlined-number"
              label="Quantity"
              type="number"
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />

          </div>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleCloseEditModal}>Cancel</Button>
          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
          >
            Save
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">List Product</Typography>

        <Button variant="contained" color="inherit" onClick={() => handleOpenEditModal("Create Product")} startIcon={<Iconify icon="eva:plus-fill" />} >
          New Product
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <UserTableHead
              order={order}
              orderBy={orderBy}
              rowCount={users.length}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'name', label: 'Name' },
                { id: 'company', label: 'Company' },
                { id: 'role', label: 'Role' },
                { id: 'isVerified', label: 'Verified', align: 'center' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <UserTableRow
                    key={row.id}
                    name={row.name}
                    role={row.role}
                    status={row.status}
                    company={row.company}
                    avatarUrl={row.avatarUrl}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                    handleClickEdit={(title) => handleOpenEditModal(title)}
                    handleClickDelete={handleOpenDeleteModal}
                  />
                ))}

              <TableEmptyRows
                height={77}
                emptyRows={emptyRows(page, rowsPerPage, users.length)}
              />

              {notFound && <TableNoData query={filterName} />}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
