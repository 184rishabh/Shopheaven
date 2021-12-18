import React, { Fragment } from 'react'
import NAV from '../components/nav'
import './admin.css'

function ADMIN() {
    return (
        <Fragment>
            <NAV/>
            <section>
  <div class="container">
    <div class="row justify-content-center mb-5">
      <h1>Welcome to Admin Page</h1>
    </div>
  </div>
  <div class="container">
    <div class="row">
                    <div class="col-lg-4 col-md-6 margin-30px-bottom xs-margin-20px-bottom">
                        <div class="services-block-three">
                            <a href="javascript:void(0)">
                                <div class="padding-15px-bottom">
                                <i class="admin-icon fas fa-user"></i>
                                </div>
                                <h3>Total Users</h3>
                                <p class="xs-font-size13 xs-line-height-22"><h1>300K</h1></p>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 margin-30px-bottom xs-margin-20px-bottom">
                        <div class="services-block-three">
                            <a href="javascript:void(0)">
                                <div class="padding-15px-bottom">
                                <i class="admin-icon fas fa-wallet"></i>
                                </div>
                                <h3>Total Sales</h3>
                                <p class="xs-font-size13 xs-line-height-22"><h1>500K</h1></p>
                            </a>
                        </div>
                    </div>
                    <div class="services-block-three col-lg-4 col-md-6 margin-30px-bottom xs-margin-20px-bottom">
                        <div class="services-block-three">
                            <a href="javascript:void(0)">
                                <div class="padding-15px-bottom">
                                <i class="admin-icon fas fa-shopping-cart"></i>
                                </div>
                                <h3>Total Orders</h3>
                                <p class="xs-font-size13 xs-line-height-22"><h1>100K</h1></p>
                            </a>
                        </div>
                    </div>
                    <div class="services-block-three col-lg-4 col-md-6 sm-margin-30px-bottom xs-margin-20px-bottom">
                        <div class="services-block-three">
                            <a href="/admin/addproduct">
                                <div class="padding-15px-bottom">
                                <i class="admin-icon fas fa-tshirt"></i>
                                </div>
                                <h3>Manage products</h3>
                                <p class="xs-font-size13 xs-line-height-22">Add,delete and update products on your ecommerce shop.</p>
                            </a>
                        </div>
                    </div>
                    <div class="services-block-three col-lg-4 col-md-6 xs-margin-20px-bottom">
                        <div class="services-block-three">
                            <a href="/admin/viewuser">
                                <div class="padding-15px-bottom">
                                <i class="admin-icon fas fa-users"></i>
                                </div>
                                <h3>View Users</h3>
                                <p class="xs-font-size13 xs-line-height-22">View all active users on your ecommerce shop.</p>
                            </a>
                        </div>
                    </div>
                    <div class="services-block-three col-lg-4 col-md-6">
                        <div class="services-block-three">
                            <a href="/admin/orders">
                                <div class="padding-15px-bottom">
                                <i class="admin-icon fas fa-trash-alt"></i>
                                </div>
                                <h3>Manage orders</h3>
                                <p class="xs-font-size13 xs-line-height-22">Manage order made by the users change order status.</p>
                            </a>
                        </div>
                    </div>
                  
                </div>
  </div>
</section>
        </Fragment>
    )
}

export default ADMIN
