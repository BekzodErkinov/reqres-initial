import { useState, useEffect, useRef } from 'react'

// Services
import request from '../../services/http'
// Components
import Modal from '../../components/Modal'
import Loader from '../../components/Animation'
// Images
import userImg from '../../assets/images/userAvatar.jpg'
// SCSS
import classes from './UsersList.module.scss'

const UsersList = () => {
  // Users List
  const [listOfUsers, setListOfUsers] = useState({
    isFetched: false,
    data: [],
    error: null,
  })
  // Single User
  const [singleUser, setSingleUser] = useState({
    isFetched: false,
    data: {},
    error: null,
  })

  // ! Edit User
  const [editUser, setEditUser] = useState({
    isFetched: false,
    data: {},
    error: null,
  })

  // MODAL Show/Hide
  // Single user Modal
  const [singleUserModal, setSingleUserModal] = useState(false)
  // Add a new user Modal
  const [addUserModal, setAddUserModal] = useState(false)
  // Edit the user Modal
  const [editUserModal, setEditUserModal] = useState(false)

  // Errors
  // Add a new user Error
  const [hasAddUserError, setHasAddUserError] = useState(false)
  // ! Edit the user Error
  const [hasEditUserError, setHasEditUserError] = useState(false)

  // Selecting DOM Elements
  // Add a new user Elements
  const addUserInputImgRef = useRef(null)
  const addUserInputJobRef = useRef(null)
  const addUserInputNameRef = useRef(null)
  const addUserInputEmailRef = useRef(null)
  const addUserInputPasswordRef = useRef(null)
  // Edit the user Elements
  const editUserInputImgRef = useRef(null)
  const editUserInputJobRef = useRef(null)
  const editUserInputNameRef = useRef(null)
  const editUserInputEmailRef = useRef(null)
  const editUserInputPasswordRef = useRef(null)

  // Getting Users
  useEffect(() => {
    request.get('/users?page=1')
    .then(res => {
      console.log(res)
      setListOfUsers({
        isFetched: true,
        data: res.data.data,
        error: false,
      })
    })
    .catch(err => {
      alert(err)
      console.error(err)
      setListOfUsers({
        isFetched: true,
        data: [],
        error: true,
      })
    })
  }, [])

  // Get Single User
  const getSingleUser = id => {
    request.get(`/users/${id}`)
    .then(res => {
      setSingleUser({
        isFetched: true,
        data: res.data.data,
        error: false,
      })
    })
    .catch(err => {
      alert(err)
      console.error(err)
      setSingleUser({
        isFetched: true,
        data: {},
        error: true,
      })
    })
  }

  // Show Single User
  const showSingleUser = id => {
    setSingleUser({
      isFetched: false,
      data: {},
      error: false,
    })
    setSingleUserModal(true)
    getSingleUser(id)
  }

  // Show Edit User
  const showEditUser = id => {
    setEditUser({
      isFetched: false,
      data: {},
      error: false,
    })
    setEditUserModal(true)
    getSingleUser(id)
  }

  // Add a new user on Form Submit
  const handleAddUserSubmit = e => {
    e.preventDefault()
    request.post('/users', {
      name: addUserInputNameRef.current.value,
      job: addUserInputJobRef.current.value,
    })
    .then(res => {
      setAddUserModal(false)
      setListOfUsers(prevState => {
        return {
          ...prevState,
          data: [
            ...prevState.data,
            {
              first_name: res.data.name.split(' ')[0],
              last_name: res.data.name.split(' ')[1],
              avatar: userImg,
              email: `${res.data.name.toLowerCase().split(' ').join('')}@reqres.in`,
              job: res.data.job,
              id: res.data.id,
            }
          ]
        }
      })
    })
    .catch(err => {
      alert(err)
      console.error(err)
      setHasAddUserError(true)
    })
  }
  // Edit the user on Form Submit
  const handleEditUserSubmit = e => {
    e.preventDefault()
    setEditUserModal(false)
  }

  // Clear add a new user Input values on Modal close
  addUserModal && (function () {
    addUserInputImgRef.current.value = ''
    addUserInputJobRef.current.value = ''
    addUserInputNameRef.current.value = ''
    addUserInputEmailRef.current.value = ''
    addUserInputPasswordRef.current.value = ''
  })()
  // Clear Edit user Input values on Modal close
  editUserModal && (function () {
    editUserInputImgRef.current.value = ''
    editUserInputJobRef.current.value = ''
    editUserInputNameRef.current.value = ''
    editUserInputEmailRef.current.value = ''
    editUserInputPasswordRef.current.value = ''
  })()


  return (
    <div className={classes.usersListPage}>
      <div className="container">
        {/* MODAL WINDOWS */}
        {/* Single user Modal */}
        <Modal
          open={singleUserModal}
          handleModalClose={setSingleUserModal}
          title="Single user"
        >
          {singleUser.isFetched ? (
            <>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3">
                    <img width="200" className="bordered" src={singleUser.data.avatar} alt={`${singleUser.data.first_name} ${singleUser.data.last_name}`} />
                  </div>
                  <div className="col-md-8">
                    <h3 className="mb-2">{singleUser.data.first_name} {singleUser.data.last_name}</h3>
                    <b>Email: </b><a href={`mailto:${singleUser.data.email}`}>{singleUser.data.email}</a>
                    <p className="mt-3"><b>Bio:</b> {singleUser.data.first_name} {singleUser.data.last_name} lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione doloribus, quia inventore illo maiores eius distinctio, deleniti enim quisquam dolores praesentium. Repellat unde nostrum veritatis commodi eaque dolorem enim voluptas.</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => setSingleUserModal(false)}
                >Close</button>
              </div>
            </>
          ) : (
            <div className="loading text-center pb-5">
              <Loader />
            </div>
          )}
        </Modal>
        {/* Add a new user Modal */}
        <Modal
          open={addUserModal}
          handleModalClose={setAddUserModal}
          title="Add a new user"
        >
          <form
            className="w-100"
            id="add-user-form"
            onSubmit={handleAddUserSubmit}
          >
            <div className="modal-body">
              {hasAddUserError &&
              <div className="alert alert-danger" role="alert">
                Email or password is invalid!
              </div>}
              <div className="row">
                {/* Full name */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="add-user-full-name">Full name: <span className={classes.requiredInput}>*</span></label>
                  <input ref={addUserInputNameRef} className="form-control" type="text" name="add_user__full_name" id="add-user-full-name" placeholder="Full name" required />
                </div>
                {/* Job */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="add-user-job">Job: <span className={classes.requiredInput}>*</span></label>
                  <input ref={addUserInputJobRef} className="form-control" type="text" name="add_user__job" id="add-user-job" placeholder="Job" required />
                </div>
                {/* Email */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="add-user-email">Email address: <span className={classes.optionalInput}>(optional)</span></label>
                  <input ref={addUserInputEmailRef} className="form-control" type="email" name="add_user__email" id="add-user-email" placeholder="Email" />
                </div>
                {/* Password */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="add-user-password">Password: <span className={classes.optionalInput}>(optional)</span></label>
                  <input ref={addUserInputPasswordRef} className="form-control" type="password" name="add_user__password" id="add-user-password" placeholder="Password" />
                </div>
                {/* Upload your image */}
                <div className="col-md-12 my-3">
                  <label className="form-label" htmlFor="add-user-img">Upload your image: <span className={classes.optionalInput}>(optional)</span></label>
                  <input ref={addUserInputImgRef} className="form-control pt-1 px-0" type="file" name="add_user__img" id="add-user-img" placeholder="Upload image" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setAddUserModal(false)}
                >Discard</button>
              <button type="submit" className="btn btn-success">Add</button>
            </div>
          </form>
        </Modal>
        {/* Edit the user Modal */}
        <Modal
          open={editUserModal}
          handleModalClose={setEditUserModal}
          title="Edit the user"
        >
          <form
            className="w-100"
            id="edit-user-form"
            onSubmit={handleEditUserSubmit}
          >
            <div className="modal-body">
              {hasEditUserError &&
              <div className="alert alert-danger" role="alert">
                Email or password is invalid!
              </div>}
              <div className="row">
                {/* Full name */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="edit-user-full-name">Full name: <span className={classes.requiredInput}>*</span></label>
                  <input ref={editUserInputNameRef} value={`${singleUser.data.first_name} ${singleUser.data.last_name}`} className="form-control" type="text" name="edit_user__full_name" id="edit-user-full-name" placeholder="Full name" required />
                </div>
                {/* Job */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="edit-user-job">Job: <span className={classes.requiredInput}>*</span></label>
                  <input ref={editUserInputJobRef} className="form-control" type="text" name="edit_user__job" id="edit-user-job" placeholder="Job" required />
                </div>
                {/* Email */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="edit-user-email">Email address: <span className={classes.optionalInput}>(optional)</span></label>
                  <input ref={editUserInputEmailRef} className="form-control" type="email" name="edit_user__email" id="edit-user-email" placeholder="Email" />
                </div>
                {/* Password */}
                <div className="col-md-6 mt-3">
                  <label className="form-label" htmlFor="edit-user-password">Password: <span className={classes.optionalInput}>(optional)</span></label>
                  <input ref={editUserInputPasswordRef} className="form-control" type="password" name="edit_user__password" id="edit-user-password" placeholder="Password" />
                </div>
                {/* Upload your image */}
                <div className="col-md-12 my-3">
                  <label className="form-label" htmlFor="edit-user-img">Upload your image: <span className={classes.optionalInput}>(optional)</span></label>
                  <input ref={editUserInputImgRef} className="form-control pt-1 px-0" type="file" name="edit_user__img" id="edit-user-img" placeholder="Upload image" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setEditUserModal(false)}
                >Cancel</button>
              <button type="submit" className="btn btn-success">Save Changes</button>
            </div>
          </form>
        </Modal>

        {/* Users list */}
        <div className="row">
        <button className="btn btn-info col-md-12" onClick={() => setAddUserModal(true)}>Add User</button>
          {listOfUsers.data.map(user => (
            <div className="col-md-3 mt-4" key={user.id}>
              <div className="card" id={user.id}>
                <img width="253" height="253" className="card-img-top" src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                <div className="card-body">
                  <h3 className="card-title mb-2">{user.first_name} {user.last_name}</h3>
                  {user?.job && <h5><b>Job: </b>{user.job}</h5>}
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                  <br/>
                  <button className="btn btn-outline-primary mt-3 mr-2" onClick={() => showSingleUser(user.id)}>More Info</button>
                  <button className="btn btn-outline-warning mt-3" onClick={() => showEditUser(user.id)}>Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className={`bg-dark text-white mt-5 p-2 ${classes.usersListFooter}`}>
        <div className="container text-center">
          <h5>&copy;2021</h5>
        </div>
      </footer>
    </div>
  )
}

export default UsersList
