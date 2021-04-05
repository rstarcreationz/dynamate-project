import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import Header from "../Header";

const ProfileManager = () => {

	const [managerView, SetmanagerView] = useState({
		
	})
	// const { id } = useParams();
    useEffect(() => {
        LoadData();
    }, [])

    const LoadData = async (id) => {
       
		var token = localStorage.getItem('user-token');
        const config = {
            headers: { "Authorization":"Bearer "+token, "Accept": "application/json" }
        };

        axios.get(`users/project-manager/list/${id}`, config)
            .then(result => {
                SetmanagerView(result.data.data.projectmanagers)
                console.log(managerView)
            });
    }


    return (
        <>
		<Header/>
    <section class="Profileview">
	    <div class="container">
       
		<div class="row">
			<div class="col-md-12">
				<div class="profile_Card profile_details">
					<div class="row">
						<div class="col-md-4">
							<div class="Profile_pic">
								<img src="https://i1.wp.com/bestlifeonline.com/wp-content/uploads/2017/05/shutterstock_529646395.jpg?fit=1024%2C682&amp;ssl=1" alt="" />
								<h5>Jhon Carter</h5>
							</div>
						</div>
						<div class="col-md-8">
							<div class="profile_Detail">
								<h4>Project Manager Info</h4>
								<div class="row mt-3">
									<div class="col-md-6">
										<div class="form-group">
											<label for="">Full Name</label>
											<p>{managerView.fullname}</p>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="">Email</label>
											<p>jhoncarter@gmail.com</p>
										</div>
									</div>
                                    <div class="col-md-6">
										<div class="form-group">
											<label for="">Phone No.</label>
											<p>123456789</p>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label for="">Username</label>
											<p>jhon.disuza123</p>
										</div>
									</div>
								</div>
								<div class="profileEdit_btn">
									<Link to="/add_project_manager">
										<button type="button" class="custom_btn">Edit</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

        </>
    );
}

export default ProfileManager;