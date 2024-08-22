import propTypes from "prop-types";

export default function CMSCategoryList(props) {
  const { category } = props;

  return (
      <>
        <tr>
          <th scope="row" >{category.id}</th>
          <td>{category.name}</td>
        </tr> 
      </>
  ) 
}

CMSCategoryList.propTypes = {
  category: propTypes.object,
}