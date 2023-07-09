let htmlModal=``
htmlModal+=`
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/themify-icons.css">
`

htmlModal+=`
    <!-- Button trigger modal -->
    <button type="button" id="btnShowModal" class="btn btn-primary btn-lg d-none" data-toggle="modal" data-target="#modelId">
      Launch
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalTitle"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 col-md-12 col-lg-5" id="ModalBody">
                            Body
                        </div>
                        <div class="col-12 col-md-12 col-lg-7 sale-detail card mb-4">
                            <div class="">
                                <ul style="padding-top: 20px;padding-bottom: 10px;">
                                    <li class="mb-2">
                                    <i class="ti ti-calendar" aria-hidden="true"></i>
                                    warranted for 12 months
                                    </li>
                                    <li class="mb-2">
                                    <i class="ti ti-reload" aria-hidden="true"></i>
                                    exchange 1/1 in the first 15 days if something goes wrong
                                    </li>
                                    <li class="mb-2">
                                    <i class="ti ti-truck" aria-hidden="true"></i>
                                    Free shippingworldwide
                                    </li>
                                    <li class="mb-2">
                                    <i class="ti ti-check-box" aria-hidden="true"></i>
                                    Installment 0% Payment <br> * Only applicable when buying directly at the store.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div  id="ModalFooter">
                        Footer
                    </div>
                </div>
            </div>
        </div>
    </div>
`
document.writeln(htmlModal)

const showModal=(tag,title)=>{
    console.dir(tag)
    let tieuDe=title;
    ModalTitle.innerHTML=tieuDe
    ModalBody.innerHTML= tag.parentNode.children[1].outerHTML + tag.parentNode.children[2].outerHTML
    ModalFooter.innerHTML= tag.parentNode.children[3].outerHTML
    document.getElementById("btnShowModal").click();
    
}