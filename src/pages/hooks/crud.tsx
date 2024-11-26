import React, { useEffect, useState } from "react";
import useFetchList from "../../hooks/crud/use-fetch-list";
import useFetchByID from "../../hooks/crud/use-fetch-by-id";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Divider,
  Alert,
  ListItemButton,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import {
  Add as AddIcon,
  // Delete as DeleteIcon,
  // Edit as EditIcon
} from "@mui/icons-material";
import useCreateResource from "../../hooks/crud/use-create-resource";
import useUpdateResource from "../../hooks/crud/use-update-resource";
import useDeleteResource from "../../hooks/crud/use-delete-resource";
import { useAppDispatch } from "../../redux/store";
import { addToken } from "../../redux/slices/user-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";

type UserType = {
  username: string | null;
};

function Crud() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserType>({ username: null });
  const [updateUser, setUpdateUser] = useState<UserType>({ username: null });
  const [addUserError, setAddUserError] = useState<string | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.usersList.token);

  //use fetch list  Hook---------------
  const { data, loading, error } = useFetchList("users", token);

  //use fetch by Id Hook---------------
  const {
    fetchDataById,
    data: userDetails,
    loading: userLoading,
    error: userError,
  } = useFetchByID();
  const detailViewHandler = async (id: string) => {
    // Toggle the selected user details view (if the same user is clicked again, it hides the details)
    if (selectedUserId === id) {
      setSelectedUserId(null); // Deselect the user if clicked again
    } else {
      setSelectedUserId(id); // Set the selected user ID to show details
    }

    // Fetch details if ID is provided
    if (id) {
      await fetchDataById("users", id, token);
    }
  };

  //use create Hook---------------
  const {
    createResource,
    loading: addUserLoading,
    error: createError,
    success,
  } = useCreateResource();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.username || user.username.trim() === "") {
      setAddUserError("Username is required");
      return;
    }
    setAddUserError(null); // Clear any previous error
    try {
      const responseData = await createResource("users/add", user, token); // Call the hook's function
      if (success) {
        setUser({
          username: null,
        });
      }
      // console.log("users/add",addUserLoading,createError,success, responseData); // Handle the response as needed
    } catch (err) {
      console.error(err); // Log the error or handle it as required
    }
  };

  const onclickUpdateHandler = () => {
    setShowUpdateForm(true);
  };

  //use update Hook---------------
  const {
    updateResource,
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useUpdateResource();
  const updateHandler = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const response = await updateResource("users", updateUser, id, token);
    console.log("response while updating", response);
  };

  //use delete hook---------------
  const {
    deleteResource,
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useDeleteResource();
  const deleteHandler = async (id: string) => {
    await deleteResource("users", id, token);
  };

  //set token inside redux

  useEffect(() => {
    dispatch(addToken("authtokenvalue"));
  }, []);
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mb: 4 }} style={{padding:"10px"}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={9}>
            <TextField
              id="user"
              label="Add User"
              variant="outlined"
              name="userName"
              value={user.username}
              onChange={(e) => setUser({ username: e.target.value })}
              error={!!error}
              helperText={error}
              required
              fullWidth
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              startIcon={<AddIcon />}
              sx={{
                height: "56px",
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Add User
            </Button>
            {/* Show user details error state */}
            {createError && (
              <Alert severity="error" sx={{ my: 2 }}>
                {createError}
              </Alert>
            )}
            {addUserLoading && (
              <Alert severity="info" sx={{ my: 2 }}>
                Creating user...
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ my: 2 }}>
                {success}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          User List
        </Typography>

        {/* Show loading state */}
        {loading && (
          <Box sx={{ textAlign: "center", my: 4 }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Loading users...
            </Typography>
          </Box>
        )}

        {/* Show error state */}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        {/* Show data when loaded */}
        {!loading && !error && (!data?.users || data?.users?.length === 0) && (
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ my: 2 }}
          >
            No users found.
          </Typography>
        )}

        {!loading && !error && data && data.users.length > 0 && (
          <Paper elevation={3} sx={{ p: 2 }}>
            <List>
              {data.users.map((user) => (
                <React.Fragment key={user.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        `${user.firstName} ${user.lastName}` || "Unknown Name"
                      }
                      secondary={`${user.email || "No Email Provided"} | Age: ${
                        user.age || "N/A"
                      }`}
                    />
                    <ListItemButton onClick={() => detailViewHandler(user.id)}>
                      View Details
                    </ListItemButton>
                  </ListItem>

                  {/* Show user details below the specific user if selected */}
                  {selectedUserId === user.id && (
                    <Box sx={{ pl: 3, pt: 2 }}>
                      {/* Show user details loading state */}
                      {userLoading && (
                        <Box sx={{ textAlign: "center", my: 2 }}>
                          <CircularProgress />
                          <Typography variant="body2" sx={{ mt: 2 }}>
                            Loading user details...
                          </Typography>
                        </Box>
                      )}

                      {/* Show user details error state */}
                      {userError && (
                        <Alert severity="error" sx={{ my: 2 }}>
                          {userError}
                        </Alert>
                      )}

                      {/* Show user details when available */}
                      {userDetails && (
                        <Paper elevation={3} sx={{ p: 2 }}>
                          <Typography variant="h6">User Details</Typography>
                          <Typography variant="body1">
                            Name: {userDetails.firstName} {userDetails.lastName}{" "}
                          </Typography>
                          <Typography variant="body1">
                            Email: {userDetails.email}
                          </Typography>
                          <Typography variant="body1">
                            Age: {userDetails.age}
                          </Typography>
                          <Typography variant="body1">
                            Gender: {userDetails.gender}
                          </Typography>
                          <Typography variant="body1">
                            Birth Date: {userDetails.birthDate}
                          </Typography>
                          <Button
                            variant="contained"
                            onClick={onclickUpdateHandler}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ marginLeft: "10px" }}
                            variant="contained"
                            onClick={() => deleteHandler(userDetails.id)}
                          >
                            {deleteLoading ? "Deleting...." : "Delete"}
                          </Button>
                          {deleteError && (
                            <Alert severity="error" sx={{ my: 2 }}>
                              {deleteError}
                            </Alert>
                          )}

                          {deleteSuccess && (
                            <Alert severity="success" sx={{ my: 2 }}>
                              {deleteSuccess}
                            </Alert>
                          )}
                          {showUpdateForm && (
                            <Box
                              component="form"
                              onSubmit={(e) => updateHandler(e, userDetails.id)}
                              noValidate
                              sx={{ mb: 4 }}
                              style={{ marginTop: "20px" }}
                            >
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={9}>
                                  <TextField
                                    id="user"
                                    label="Edit User Name"
                                    variant="outlined"
                                    name="userName"
                                    value={updateUser.username}
                                    onChange={(e) =>
                                      setUpdateUser({
                                        username: e.target.value,
                                      })
                                    }
                                    error={!!error}
                                    helperText={error}
                                    required
                                    fullWidth
                                    autoFocus
                                    sx={{
                                      "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                      },
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                  <Button
                                    variant="contained"
                                    fullWidth
                                    type="submit"
                                    // startIcon={<AddIcon />}
                                    sx={{
                                      height: "56px",
                                      borderRadius: 2,
                                      textTransform: "none",
                                    }}
                                  >
                                    {updateLoading
                                      ? "Updating......"
                                      : "Update User"}
                                  </Button>
                                  {/* Show user details error state */}
                                </Grid>
                              </Grid>
                              {updateError && (
                                <Alert severity="error" sx={{ my: 2 }}>
                                  {updateError}
                                </Alert>
                              )}

                              {updateSuccess && (
                                <Alert severity="success" sx={{ my: 2 }}>
                                  {updateSuccess}
                                </Alert>
                              )}
                            </Box>
                          )}
                        </Paper>
                      )}
                    </Box>
                  )}
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </>
  );
}

export default Crud;
