import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <Link
        key={s._id}
        to={`/sub/${s.slug}`}
        className='col btn btn-outline-primary btn-lg btn-block btn-raised m-3'
      >
        {s.name}
      </Link>
    ));

  return (
    <div className='container'>
      <div className='row'>
        {loading ? (
          <h3 className='col text-center'>Sub categories Loading....</h3>
        ) : (
          showSubs()
        )}
      </div>
    </div>
  );
};

export default SubList;
