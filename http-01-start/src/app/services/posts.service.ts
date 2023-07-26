import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, catchError, delay, map, subscribeOn, throwError } from "rxjs";
import { Post } from "../model/post.model";

@Injectable({ providedIn: 'root' })
export class PostsService {

    static readonly uri = 'https://rava-6b08a-default-rtdb.asia-southeast1.firebasedatabase.app/my-posts.json';

    error: Subject<string> = new Subject();
    constructor(private http: HttpClient) { }

    createPost(postData: { title: string; content: string }) {
        // Send Http request
        /* The .json is required at the end of URI for firebase */
        this.http.post(PostsService.uri, postData, {
            params: new HttpParams().set('print', 'pretty').set('abc', 'def'),
            observe: 'response'
        })
            .subscribe({
                next: (response) => {
                    // console.log(response);
                },
                error: (error) => {
                    console.error('EXC caught in POST')
                    console.error(error);
                    this.error.next(error.errorMessage);
                }
            });
    }

    fetchPosts(): Observable<any> {
        return this.http.get<{ [k: string]: Post }>(PostsService.uri, {
            headers: new HttpHeaders({
                'Custom-header': 'Custom value'
            })
        })
            .pipe(delay(2000),
                map(
                    (resp) => {
                        const responseArray = [];
                        for (const key in resp) {
                            responseArray.push({ ...resp[key], id: key });
                        }
                        return responseArray;
                    }),
                catchError((errorResp) => {
                    this.error.next('Fetch failed');
                    return throwError(() => errorResp);
                }));
    }

    deletePosts() {
        this.http.delete(PostsService.uri).subscribe({
            next: (response) => {
                console.log(response);
            },
            error: (error) => {
                this.error.next(error.errorMessage);
            }
        });
    }

}