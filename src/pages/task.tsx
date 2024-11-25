import { 
  Box, 
  Button, 
  Grid, 
  TextField, 
  Typography, 
  Paper,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Tooltip,
  Alert,
  Snackbar
} from "@mui/material";
import { 
  Add as AddIcon, 
  Delete as DeleteIcon,
  Edit as EditIcon 
} from '@mui/icons-material';
import { useState } from "react";
import { Store } from "../zustand/store";
interface TaskItem {
  id: number;
  text: string;
  completed: boolean;
}

function Task() {
  const [task, setTask] = useState<string>("");
  // const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [error, setError] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const addTask = Store((state) => state.addTask);
  const deleteTask = Store((state) => state.deleteTask);
  const tasks = Store((state) => state.tasks);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }

    const newTask: TaskItem = {
      id: Date.now(),
      text: task.trim(),
      completed: false
    };

    // setTasks([...tasks, newTask]);
    addTask(newTask)
    setTask("");
    setError("");
    setOpenSnackbar(true);
  };

  console.log("Tasks from zustand ",tasks);
  
  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  // const toggleComplete = (id: number) => {
  //   setTasks(tasks.map(task => 
  //     task.id === id ? { ...task, completed: !task.completed } : task
  //   ));
  // };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            color: 'primary.main',
            mb: 4 
          }}
        >
          Task Manager
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mb: 4 }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
          >
            <Grid item xs={12} sm={9}>
              <TextField
                id="task"
                label="Add Task"
                variant="outlined"
                name="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                error={!!error}
                helperText={error}
                required
                fullWidth
                autoFocus
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
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
                  height: '56px',
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </Box>

        <List sx={{ width: '100%' }}>
          {tasks.length>0 && tasks.map((task:any, index:any) => (
            <Box key={task.id}>
              <ListItem
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary'
                      }}
                    >
                      {task.text}
                    </Typography>
                  }
                  // onClick={() => toggleComplete(task.id)}
                  sx={{ cursor: 'pointer' }}
                />
                <ListItemSecondaryAction>
                  <Tooltip title="Delete task">
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDelete(task.id)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
              {index < tasks .length - 1 && <Divider />}
            </Box>
          ))}
        </List>

        {tasks.length === 0 && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography color="text.secondary">
              No tasks yet. Add a new task to get started!
            </Typography>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert 
          onClose={() => setOpenSnackbar(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Task added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Task;