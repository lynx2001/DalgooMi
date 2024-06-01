document.addEventListener('DOMContentLoaded', function() {
    const storeForm = document.getElementById('storeForm');
    const storesContainer = document.getElementById('storesContainer');

    storeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const storeName = document.getElementById('storeName').value;
        const storeAddress = document.getElementById('storeAddress').value;
        const storePhone = document.getElementById('storePhone').value;
        const storeRating = document.getElementById('storeRating').value;
        const storeDescription = document.getElementById('storeDescription').value;
        const storeImage = document.getElementById('storeImage').files[0];

        if (storeName.trim() !== '' && storeAddress.trim() !== '' && storePhone.trim() !== '' && storeRating.trim() !== '') {
            addStore(storeName, storeAddress, storePhone, storeRating, storeDescription, storeImage);
            storeForm.reset();
        }
    });

    function addStore(name, address, phone, rating, description, image) {
        const storeDiv = document.createElement('div');
        storeDiv.classList.add('store');

        const storeName = document.createElement('p');
        storeName.textContent = `상호명: ${name}`;

        const storeAddress = document.createElement('p');
        storeAddress.textContent = `주소: ${address}`;

        const storePhone = document.createElement('p');
        storePhone.textContent = `전화번호: ${phone}`;

        const storeRating = document.createElement('p');
        storeRating.classList.add('rating');
        storeRating.textContent = `평점: ${rating}`;

        const storeDescription = document.createElement('p');
        storeDescription.textContent = `설명: ${description}`;

        storeDiv.appendChild(storeName);
        storeDiv.appendChild(storeAddress);
        storeDiv.appendChild(storePhone);
        storeDiv.appendChild(storeRating);
        storeDiv.appendChild(storeDescription);

        if (image) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const storeImg = document.createElement('img');
                storeImg.src = e.target.result;
                storeDiv.appendChild(storeImg);
            }
            reader.readAsDataURL(image);
        }

        const likeButton = document.createElement('button');
        likeButton.textContent = '좋아요';
        likeButton.classList.add('like-button');

        const likesCount = document.createElement('span');
        likesCount.textContent = '0';
        likesCount.classList.add('likes-count');

        likeButton.addEventListener('click', function() {
            let count = parseInt(likesCount.textContent);
            likesCount.textContent = count + 1;
            sortStores(); // 추가: 좋아요 수 변경될 때마다 상점 재정렬
        });

        storeDiv.appendChild(likeButton);
        storeDiv.appendChild(likesCount);

        storesContainer.appendChild(storeDiv);
        sortStores(); // 추가: 새로운 상점이 추가될 때마다 상점 정렬
    }

    //좋아요 수 따라서 정렬하는 함수 추가
    function sortStores() {
        // 'store' 클래스를 가진 모든 요소를 배열로 변환하여 가지고 옴
        const stores = Array.from(storesContainer.getElementsByClassName('store'));
        // 좋아요 순에 따른 내림차순 정렬
        /*'likesCountHTML' 부분에 html 코드에서 각 맛집별 '좋아요 수'를 나타내는 클래스를 불러와야 하는데
        명확한 클래스 이름이 정의가 안 돼 있는 것 같아서 임의로 likesCountHTML이라고 넣었습니다!!
        추후 수정 필요... ^_^*/
        stores.sort((a,b)=> {
            const aLikes = parseInt(a.querySelector('.likesCountHTML').textContent);
            const bLikes = parseInt(b.querySelector('.likesCountHTML').textContent);
            return bLikes - aLikes;
        });

        storesContainer.innerHTML = ''; // 기존의 모든 상점 요소 제거 후
        // 정렬된 순서대로 상점 요소들 다시 추가
        stores.forEach(store => {
            storesContainer.appendChild(store);
        });
    }
});
