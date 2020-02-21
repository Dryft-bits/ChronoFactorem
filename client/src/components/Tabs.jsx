import React, { Component } from "react";
  import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

  class TabsDefault extends Component {
    state = {
      activeItem: "1"
    };

    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };

    render() {
      return (
        <MDBContainer>
        <MDBNav className="nav-tabs mt-5">
          <MDBNavItem>
            <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
              Dashboard
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
              Create TT
            </MDBNavLink>
          </MDBNavItem>
          {/* <MDBNavItem>
            <MDBNavLink to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
              View Shared TT
            </MDBNavLink>
          </MDBNavItem> */}
        </MDBNav>
        <MDBTabContent activeItem={this.state.activeItem} >
          <MDBTabPane tabId="1" role="tabpanel">
            {/* Yaha pe call the Dashboard Component */}
          </MDBTabPane>
          <MDBTabPane tabId="2" role="tabpanel">
            {/* Yaha pe call the Create TT Component */}
          </MDBTabPane>
          {/* <MDBTabPane tabId="3" role="tabpanel">
                       LITE 
          </MDBTabPane> */}
        </MDBTabContent>
      </MDBContainer>
    );
  }
}
export default TabsDefault;
