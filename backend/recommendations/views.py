from rest_framework.views import APIView
from rest_framework.response import Response
from .models import JobListing
from .ml_recommendation_model import recommend_jobs
from rest_framework.pagination import PageNumberPagination
from .serializers import JobListingSerializer, RegisterSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate




class MyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 161594
    
    
# Create your views here.

class JobListView(APIView):
    pagination_class = MyPagination
    def get(self, request):
        jobs = JobListing.objects.all()
        paginator = MyPagination()
        result_page = paginator.paginate_queryset(jobs, request)
        serializer = JobListingSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    
class JobRecommendationView(APIView):
    pagination_class = MyPagination
    def post(self, request):
        user_skills = request.data.get("skills", "")
        
        # Ensure 'skills' is provided
        if not user_skills:
            return Response({"error": "Skills are required."}, status=400)
        
        # Fetch recommended jobs based on user skills
        recommended_jobs = recommend_jobs(user_skills)
        
        paginator = MyPagination()
        result_page = paginator.paginate_queryset(recommended_jobs, request)
        
        serializer = JobListingSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
    

# Register View
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully!"}, status=201)
        return Response(serializer.errors, status=400)


# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        return Response({"error": "Invalid credentials"}, status=400)