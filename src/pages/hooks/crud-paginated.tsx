import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import usePaginatedFetch from "../../hooks/crud/use-paginated-fetch";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";

function CurdPaginated() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const skip = (page - 1) * limit;
  const token = useSelector((state: RootState) => state.usersList.token);

  const { data, isLoading, error } = usePaginatedFetch("users", {
    limit,
    skip,
    token,
  });

  console.log("data", data);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        User List
      </Typography>

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Loading users...
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error.message}
        </Alert>
      )}

      {/* No Data State */}
      {!isLoading && !error && (!data || data.users.length === 0) && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ my: 2 }}
        >
          No users found.
        </Typography>
      )}

      {/* Data Display */}
      {!isLoading && !error && data && data.users.length > 0 && (
        <>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <List>
              {data.users.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem
                    secondaryAction={
                      <ListItemButton color="primary">
                        View Details
                      </ListItemButton>
                    }
                  >
                    <ListItemText
                      primary={`${user.firstName} ${user.lastName}`}
                      secondary={`${user.email} | Age: ${user.age || "N/A"}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Pagination Controls */}
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Grid item xs={12} md={6}>
              <Stack spacing={2} alignItems="center">
                <Pagination
                  count={Math.ceil((data.total || 0) / limit)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2" sx={{ mr: 2 }}>
                  Items per page:
                </Typography>
                <TextField
                  select
                  size="small"
                  value={limit}
                  onChange={handleLimitChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {[5, 10, 20, 50].map((limitOption) => (
                    <option key={limitOption} value={limitOption}>
                      {limitOption}
                    </option>
                  ))}
                </TextField>
              </Box>
            </Grid>
          </Grid>

          {/* Total Results Information */}
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Showing {(page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, data.total)} of {data.total} total users
          </Typography>
        </>
      )}
    </Box>
  );
}

export default CurdPaginated;
