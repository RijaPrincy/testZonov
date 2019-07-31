import React, { Component } from 'react'
import axios from 'axios'


class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: "",
            genre: "none",
            gender: "none",
            genreBook: "",
            list1: ''
        };
    }




    componentDidMount() {
        axios.get("http://localhost:8080/a.json")
            .then(resp => {
                this.getGenreList(resp.data)
                this.setState({
                    list: resp.data,
                    list1: resp.data
                })
                console.log("props", this.state.list);
            }).catch(err => {
                console.log(err);
            })

    }

    //recovering genre of book
    getGenreList(e) {
        var gen = [e[0].genre]
        var test = true
        //
        for (let i = 0; i < e.length; i++) {
            for (let j = 0; j < gen.length; j++) {
                if (e[i].genre == gen[j]) {
                    test = false
                    break
                }
            }
            if (test) {
                gen.push(e[i].genre)

            }
            test = true

        }
        gen.sort((a, b) => {
            var x = a.toLowerCase()
            var y = b.toLowerCase()
            if (x < y) {
                return -1
            } else if (x > y) {
                return +1
            }
            return 0
        })
        this.setState({
            genreBook: gen
        })

    }


    //sort book by book name
    sortByBookName = () => {
        this.setState({
            list: this.state.list.sort((a, b) => {
                var x = a.name.toLowerCase()
                var y = b.name.toLowerCase()
                if (x < y) {
                    return -1
                } else if (x > y) {
                    return +1
                }
                return 0
            })
        })
    }

    //sort book by  name of author
    sortByAuthorName = () => {
        this.setState({
            list: this.state.list.sort((a, b) => {
                var x = a.author.name.toLowerCase()
                var y = b.author.name.toLowerCase()
                if (x < y) {
                    return -1
                } else if (x > y) {
                    return +1
                }
                return 0
            })
        })
    }





    select = e => {
        this.setState({ genre: e.target.value })
        console.log("state", this.state.genre);
    }


    select2 = (e) => {
        this.setState({ gender: e.target.value })
        console.log("state", this.state.genre);
    }



    //filter book by Book​ ​ Genre and by author​ ​ gender
    filtrer = (e) => {
        var fi = []
        var fa = ""
        if (e.genre == "none" && e.gender !== "none") {
            fi = this.state.list1.filter(book => book.author.gender == e.gender)
            this.setState({
                list: fi
            })
        }

        if (e.genre !== "none" && e.gender == "none") {
            fi = this.state.list1.filter(book => book.genre == e.genre)


            if (e.genre == "horror") {
                var halloween = this.state.list1.filter(book => book.date.split('/')[2] == 31 && book.date.split('/')[1] == 10)
                fa = [...fi, ...halloween]
                var unique = fa.filter((v, i, a) => a.indexOf(v) === i);
                this.setState({
                    list: unique
                })

            } else if (e.genre == "finance") {

                var finance = this.state.list1.filter(book => new Date(book.date).getDay() == 5
                    && new Date(new Date(book.date).getFullYear(), new Date(book.date).getMonth() + 1, 0).getDate() - 6 <=new Date(book.date).getDate()
                    && book.genre !== e.genre)
                fa = [...fi, ...finance]

                this.setState({
                    list: fa
                })

            } else {
                this.setState({
                    list: fi
                })
            }


        }

        if (e.genre !== "none" && e.gender !== "none") {
            fi = this.state.list1.filter(book => book.genre == e.genre && book.author.gender == e.gender)
            if (e.genre == "horror") {
                var halloween = this.state.list1.filter(book => book.date.split('/')[1] == 10 && book.date.split('/')[2] == 31
                    && book.author.gender == e.gender
                    && book.genre !== e.genre)
                fa = [...fi, ...halloween]
                // var unique = fa.filter((v, i, a) => a.indexOf(v) === i);
                //console.log(unique);

                this.setState({
                    list: fa
                })

            } else if (e.genre == "finance") {
                var finance = this.state.list1.filter(book => new Date(book.date).getDay() == 5
                    && new Date(new Date(book.date).getFullYear(), new Date(book.date).getMonth() + 1, 0).getDate() - 6 < new Date(book.date).getDate()
                    && book.genre !== e.genre && book.author.gender == e.gender)
                fa = [...fi, ...finance]

                this.setState({
                    list: fa
                })

            } else {
                this.setState({
                    list: fi
                })
            }

        }
        if (e.genre == "none" && e.gender == "none") {

            this.setState({
                list: this.state.list1
            })

        }

    }









    render() {
        return (


            <div>


                <div>
                    <div >
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            this.filtrer({
                                genre: this.state.genre,
                                gender: this.state.gender
                            })

                        }}>
                            <div class="form-group" className="col-md-6">
                                <h3>Filter​ ​ By​ </h3>
                                <label for="exampleFormControlSelect1">​ Book​ ​ Genre</label>
                                <select class="form-control" id="exampleFormControlSelect1" value={this.state.genre} onChange={this.select}>
                                    <option value="none">All</option>
                                    {this.state.genreBook.length > 0 ? this.state.genreBook.map(re => {
                                        return (

                                            <option value={re} >{re}</option>

                                        )
                                    }) : ""}
                                </select>



                            </div>
                            <div class="form-group" className="col-md-6">
                                <label for="exampleFormControlSelect1"> Author​ ​ Gender</label>
                                <select class="form-control" id="exampleFormControlSelect2" name="gender" value={this.state.gender} onChange={this.select2}>
                                    <option value="none">All</option>
                                    <option value="man">man</option>
                                    <option value="woman">woman</option>

                                </select>
                            </div>

                            <input type="submit" className="btn btn-primary" value="search" style={{ marginTop: "10px" }} />
                        </form>
                    </div>

                </div>



                <ul class="list-unstyled components">

                    <li>
                        <button onClick={e => {
                            e.preventDefault()
                            this.sortByBookName()
                        }} style={{ marginTop: "10px" }} className="btn btn-primary">Sort by book​​ name</button>
                    </li>
                    <li>
                        <button onClick={e => {
                            e.preventDefault()
                            this.sortByAuthorName()
                        }} style={{ marginTop: "10px" }} className="btn btn-primary">Sort by author name</button>
                    </li>

                </ul>




                {this.state.list.length > 0 ? <div className="row">

                    {this.state.list.map(res => {
                        return (
                           
                                <div >
                                    <div className="col-md" style={{ marginTop: "10px",marginBottom:"10px" }}>
                                    <center>
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="card-title">  {res.name}</h4>
                                                <p class="card-text">Genre :{res.genre}</p>
                                                <p class="card-text">Author: {res.author.name}({res.author.gender})</p>
                                                <p class="card-text">publish date :{res.date}</p>
                                            </div>
                                        </div>
                                        </center>
                                    </div>

                                </div>
                            


                        )
                    })}
                </div> : ""}
            </div>
        )
    }
}


export default home
