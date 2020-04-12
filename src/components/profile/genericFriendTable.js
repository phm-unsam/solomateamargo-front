import React, { Fragment }  from 'react';
import style from './style'
import MaterialTable from 'material-table';

export const GenericFriendsTable = (props) => {
    const classes = style();

    let friends = props.friends;
    let actionOnClick = props.actionOnClick;
    let noDataMsg = props.noDataMsg;
    let title = props.title;
    let titleButton = props.titleButton;
    let icon = props.icon;

    return (
      <Fragment>
          <MaterialTable
            title={title}
            columns={[
              { title: "Nombre", field: "name" },
              { title: "Apellido", field: "lastName" }
            ]}
            data={friends}
            options={
              {
                search: false,
                paging: false,
                actionsColumnIndex: -1,
              }
            }
            localization={
              {
                body: { emptyDataSourceMessage: noDataMsg },
                header: { actions: "Acciones" }
              }
            }
            actions={[
              {
                icon: icon,
                tooltip: titleButton,
                onClick: actionOnClick
              }
            ]}
          />
      </Fragment>
    )    
}