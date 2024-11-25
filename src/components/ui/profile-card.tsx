import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root-reducer";
import { useState } from "react";
import UserDetailModal from "../modals/user-detail-modal";

export default function ProfileCard() {
  const AllUsers = useSelector((state: RootState) => state.usersList.users);
  const [modalOpen, setModalOpen] = useState(false);
  console.log("user", AllUsers);
  
  // Function to open the modal
  const handleOpen = () => {
    setModalOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
    {AllUsers.length > 0 ? (
      AllUsers.map((user, i) => (
        <div key={i}>
          <Card sx={{ maxWidth: 345 }}>
            {/* Uncomment and provide an appropriate image URL if needed */}
            {/* <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user?.userName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user?.email}
              </Typography>
              <Button onClick={handleOpen}>View Detail</Button>
            </CardContent>
          </Card>
          <UserDetailModal user={user} open={modalOpen} onClose={handleClose} />
        </div>
      ))
    ) : (
      <p>Users List Empty</p>
    )}
  </>
  
  );
}
