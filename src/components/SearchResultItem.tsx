import { eventNames } from 'process';
import React from 'react';
import './../css/SearchResult.css'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


interface Props {
    item: any;
    onClickItem: (item: any) => void;
}




export class SearchResultItem<SearchBox> extends React.Component<Props> {


    clickItem = () => {

        this.props.onClickItem(this.props.item)
    }
//<div className='item' onClick={this.clickItem}>{this.props.item.display_name}</div>
    render() {
        return (<div>
            <Card className='root'>
      <CardHeader
      className='item'
       onClick={this.clickItem}
        avatar={
          <Avatar aria-label="recipe" className='avatar'>
            {this.props.item.type.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={this.props.item.display_name}
        subheader={this.props.item.type}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        {this.props.item.display_name}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card></div>);

    }
}

export default SearchResultItem;
